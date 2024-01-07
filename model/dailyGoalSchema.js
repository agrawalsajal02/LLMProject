import mongoose from 'mongoose';

const timeSlotSchema = new mongoose.Schema({
  startTime: String, // e.g., "09:00 AM"
  endTime: String, // e.g., "10:00 AM"
  isAssigned:Boolean,
  isCompleted: {
    type: Boolean,
    default: false
  },
  goalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Goal'
  }
});

const dailyScheduleSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  timeSlots: [timeSlotSchema]
});

const weeklyScheduleSchema = new mongoose.Schema({
  weekStart: Date, // e.g., "2024-04-07"
  weekEnd: Date, // e.g., "2024-04-14"
  days: [dailyScheduleSchema]
});

export const WeeklySchedule = mongoose.model('WeeklySchedule', weeklyScheduleSchema);
