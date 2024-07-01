const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Exercise",
  },
  calories: {
    type: Number,
    required: true,
    default: 0,
  },
  duration: {
    type: Number,
    required: true,
    default: 10,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const badgeSchema = new mongoose.Schema({
  '10Steps': {
    type: Boolean,
    default: true,
  },
  '30Steps': {
    type: Boolean,
    default: false,
  },
  '50Steps': {
    type: Boolean,
    default: false,
  },
  '1000mlWater': {
    type: Boolean,
    default: false,
  },
  '2000mlWater': {
    type: Boolean,
    default: false,
  },
  '3000mlWater': {
    type: Boolean,
    default: false,
  },
});

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    exerciseCalories: {
      type: Number,
      default: 0,
    },
    exerciseTime: {
      type: String,
      default: "0:00",
    },
    height: {
      type: Number,
      default: 0,
    },
    weight: {
      type: Number,
      default: 0,
    },
    age: {
      type: Number,
      default: 0,
    },
    goalSteps: {
      type: Number,
      default: 2000,
    },
    currentStepCount: {
      type: Number,
      default: 0,
    },
    exercises: [exerciseSchema],
    waterIntake: {
      type: Number,
      default: 0,
    },
    drinkGoal: {
      type: Number,
      default: 2000,
    },
    badges: [badgeSchema]
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model("User", UserSchema);
