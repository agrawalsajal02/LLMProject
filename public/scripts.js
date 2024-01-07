
document.addEventListener('DOMContentLoaded', () => {
const goalForm = document.getElementById('goalForm');
const addGoalBtn = document.getElementById('addGoal');
const goalEntries = document.getElementById('goalEntries');

addGoalBtn.addEventListener('click', () => {
const newEntry = goalEntries.firstElementChild.cloneNode(true);
newEntry.querySelectorAll('input, select').forEach(input => input.value = '');
goalEntries.appendChild(newEntry);
});

goalForm.addEventListener('click', (e) => {
if (e.target.classList.contains('remove-goal')) {
  e.target.parentElement.remove();
}
});
});
function toggleWeekGoals(weekId) {
var element = document.getElementById(weekId);
if (element.style.display === "none") {
element.style.display = "block";
} else {
element.style.display = "none";
}
}
function toggleWeek(index) {
var week = document.getElementById('week-' + index);
if (week.style.display === 'none' || week.style.display === '') {
week.style.display = 'block';
} else {
week.style.display = 'none';
}
}