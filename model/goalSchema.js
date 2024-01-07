
import mongoose from 'mongoose';

// Create a schema for weekly goals
const goalSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number, // Duration in hours
    required: true
  },
  goalType: {
    type: String,
    enum: ['academic', 'job promotion', 'skills', 'english', 'other'],
    required: true
  },  
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true
  },
  preferredTime: {
    type: String,
    enum: ['Morning Weekday', 'Evening Weekday', 'Saturday Weekend', 'Sunday Weekend'],
    required: true
  },
  week: {
    type: String, // ISO format for week "YYYY-Www"
    required: true
  },
  recurring: {
    type: Boolean,
    default: false
  },
  userId:String
});


export const Goal = mongoose.model('Goal', goalSchema);
