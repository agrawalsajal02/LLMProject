import { Goal } from "../model/goalSchema.js";
import express from 'express';
import {WeeklySchedule} from "../model/dailyGoalSchema.js";
const router = express.Router();

const PRIORITY_OPTIONS = ['low', 'medium', 'high'];
const TIME_OPTIONS = ['Morning Weekday', 'Evening Weekday', 'Saturday Weekend', 'Sunday Weekend'];


// Modify your GET route to pass these constants to the EJS template
router.get('/', async (req, res) => {
  try {
    const weeklySchedules = await WeeklySchedule.find({}).populate({
      path: 'days.timeSlots.goalId',
      select: 'description priority'
    });

    const goalsByWeek = await getGoalsByWeek();
    const goalSaved = req.query.saved;
    const formattedGoalsByWeek = formatGoalsByWeek(goalsByWeek);

    res.render('index', {
      priorityOptions: PRIORITY_OPTIONS,
      timeOptions: TIME_OPTIONS,
      goalSaved,
      goalsByWeek: formattedGoalsByWeek,
      weeklySchedules,
      formatDateRange
    });
  } catch (err) {
    console.error("Error retrieving data:", err);
    res.status(500).send(err.message);
  }
});

function formatGoalsByWeek(goalsByWeek) {
  return Object.keys(goalsByWeek).reduce((formatted, week) => {
    formatted[week] = {
      readableWeek: getWeekDateRange(week),
      goals: goalsByWeek[week]
    };
    return formatted;
  }, {});
}

// Helper Functions
async function getGoalsByWeek() {
  const allGoals = await Goal.find().sort({ week: 1, priority: -1 });
  return allGoals.reduce(groupGoalsByWeek, {});
}

function groupGoalsByWeek(acc, goal) {
  if (!acc[goal.week]) acc[goal.week] = [];
  acc[goal.week].push(goal);
  return acc;
}


router.post('/add-goal', async (req, res) => {
  try {
    const goalsData = parseGoalFormData(req.body);
    await saveGoals(goalsData);
    res.redirect('/goal?saved=true');
  } catch (err) {
    console.error("Error saving goals:", err);
    res.status(500).send(err.message);
  }
});

function parseGoalFormData(formData) {
  return formData.description.map((description, index) => ({
    description,
    priority: formData.priority[index],
    preferredTime: formData.preferredTime[index],
    week: formData.week,
    recurring: formData.recurring[index] === 'true',
    userId: "Admin",
    duration: formData.duration[index], // New field
      goalType: formData.goalType[index], // New field
  }));
}

async function saveGoals(goalsData) {
  for (const goalData of goalsData) {
    const newGoal = new Goal(goalData);
    await newGoal.save();
    await assignGoalsToSchedule(goalData.week, newGoal);
  }
}


// A helper function to create time slots for a day
function createTimeSlotsForDay(dayOfWeek) {
  const timeSlots = [];

  // Helper function to add time slots within a range
  function addTimeSlots(startTime, endTime) {
    let current = new Date(`01/01/2000 ${startTime}`);
    const end = new Date(`01/01/2000 ${endTime}`);

    while (current < end) {
      let nextHour = new Date(current.getTime() + 60 * 60 * 1000); // Add one hour
      timeSlots.push({
        startTime: current.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        endTime: nextHour.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        isAssigned:false,
      });
      current = nextHour;
    }
  }

  // Define time slots for weekdays
  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    addTimeSlots('06:00 AM', '10:00 AM');
    addTimeSlots('06:00 PM', '10:00 PM');
  } else { // Define time slots for weekends
    addTimeSlots('06:00 AM', '10:00 PM');
  }

  return timeSlots;
}


async function assignGoalsToSchedule(weekString,goal) {
  const weekStart = getStartDateOfWeek(weekString);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6); // The end of the week (Sunday)

  let weeklySchedule = await WeeklySchedule.findOne({ weekStart: weekStart, weekEnd: weekEnd });


  if (!weeklySchedule) {
    weeklySchedule = new WeeklySchedule({ weekStart: weekStart, weekEnd: weekEnd, days: [] });
    for (let day = new Date(weekStart); day <= weekEnd; day.setDate(day.getDate() + 1)) {
      const dayOfWeek = day.getDay();
      weeklySchedule.days.push({
        date: new Date(day),
        timeSlots: createTimeSlotsForDay(dayOfWeek)
      });
    }
  }

  // Save the weekly schedule if it was newly created
  console.log("saving the weekly goal")
  // console.log(weeklySchedule)
    await weeklySchedule.save();
  
    const unassignedGoals = [goal];

  // Now you have a weekly schedule with initialized time slots.
  // You can then assign goals to these time slots...
    // Loop through each goal and assign it to the first available time slot
    console.log(unassignedGoals)
    for (const goal of unassignedGoals) {
      console.log("Inside1");
      let isGoalAssigned = false;
    
      for (const day of weeklySchedule.days) {
        console.log("Inside2");
        // Check if the day matches the goal's preferred time (weekday or weekend)
        if ((goal.preferredTime.includes('Weekday') && (day.date.getDay() >= 1 && day.date.getDay() <= 5)) ||
            (goal.preferredTime.includes('Weekend') && (day.date.getDay() === 0 || day.date.getDay() === 6))) {
          console.log("Inside3");
    
          // Find the first available time slot
          for (const slot of day.timeSlots) {
            if (!slot.isAssigned) {
              console.log("Inside4");
              // Assign the goal to this time slot
              slot.goalId = goal._id;
              slot.isAssigned = true;
              isGoalAssigned = true; // Mark the goal as assigned
              await goal.save(); // Save the updated goal
              break; // Break from the time slot loop, goal is assigned
            }
          }
    
          if (isGoalAssigned) {
            console.log("Goal assigned, breaking from day loop");
            break; // Break from the day loop, goal is assigned
          }
        }
      }
    
      if (!isGoalAssigned) {
        console.log("Goal could not be assigned to any slot");
        // Handle the case where the goal could not be assigned to any slot
      }
    }

    // Save the updated weekly schedule
    await weeklySchedule.save();
}

function getStartDateOfWeek(weekString) {
  const [year, week] = weekString.split('-W');
  const date = new Date(year);
  const weekNumber = parseInt(week, 10);
  // Setting to nearest Thursday (1st January + 3 days) to ensure the week is correct
  date.setDate(1 - date.getDay() + 3 + (weekNumber - 1) * 7);
  date.setHours(0, 0, 0, 0);
  // Setting to the first day of the week (Monday)
  date.setDate(date.getDate() - date.getDay() + 1);
  return date;
}


function getWeekDateRange(weekString) {
  const [year, weekNumber] = weekString.split('-W');
  
  // Calculate the first date of the first week of the year
  const firstDayOfYear = new Date(year, 0, 1);
  const firstDayOfWeekOne = firstDayOfYear.getDay() === 0 ? firstDayOfYear : new Date(year, 0, 1 + (7 - firstDayOfYear.getDay()));
  
  // Calculate the start date of the specified week
  const startDate = new Date(firstDayOfWeekOne);
  startDate.setDate(firstDayOfWeekOne.getDate() + (weekNumber - 1) * 7);
  
  // Calculate the end date of the specified week
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  const options = { month: 'long', day: 'numeric' };

  // Return the formatted date range string
  return `${startDate.getDate()} ${startDate.toLocaleString('default', { month: 'long' })} - ${endDate.getDate()} ${endDate.toLocaleString('default', { month: 'long' })}, ${year}`;
}


   function formatDateRange(startDate, endDate) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      const start = new Date(startDate).toLocaleDateString('en-US', options);
      const end = new Date(endDate).toLocaleDateString('en-US', options);
      return `${start} - ${end}`;
    }


    // POST route to mark a goal as completed within a time slot
router.post('/schedule/complete/:scheduleId/:dayIndex/:slotIndex', async (req, res) => {
  console.log("got the Task completion request")
  try {
    const { scheduleId, dayIndex, slotIndex } = req.params;

    // Find the weekly schedule by ID
    const schedule = await WeeklySchedule.findById(scheduleId);
    if (!schedule) {
      return res.status(404).send('Schedule not found');
    }

    // Access the specific day and time slot
    const day = schedule.days[dayIndex];
    const timeSlot = day.timeSlots[slotIndex];

    // Check if the time slot exists
    if (!timeSlot) {
      return res.status(404).send('Time slot not found');
    }

    // Mark the time slot as completed
    timeSlot.isCompleted = true;

    // Save the updated schedule
    await schedule.save();

    // Redirect or send a response back
    res.redirect('/goal'); // Replace with the correct URL where the schedule is displayed
  } catch (error) {
    console.error("Error marking time slot as completed:", error);
    res.status(500).send('Error updating time slot');
  }
});


router.post('/schedule/remove/:scheduleId/:dayIndex/:slotIndex', async (req, res) => {
  console.log("Trying to delete the task in a slot")
  try {
    const { scheduleId, dayIndex, slotIndex } = req.params;
    const schedule = await WeeklySchedule.findById(scheduleId);

    // Remove the task from the specified time slot
    schedule.days[dayIndex].timeSlots[slotIndex].goalId = null;
    schedule.days[dayIndex].timeSlots[slotIndex].isAssigned = false;

    await schedule.save();
    res.redirect('/goal');
  } catch (error) {
    console.error("Error removing task:", error);
    res.status(500).send('Error removing task');
  }
});


export default router;
