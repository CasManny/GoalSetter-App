const AsyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require('../models/userModel')
const { StatusCodes } = require('http-status-codes')

const getAllGoals = AsyncHandler(async (req, res) => {
  const goals = await Goal.find({user: req.user._id})
  res.status(StatusCodes.OK).json(goals)
});

const createGoal = AsyncHandler(async (req, res) => {
  const { text } = req.body
  // validate input
  if(!text) {
      throw Error("Please fill in the fields")
  }
  // set goal with user means of identification by id
  const goal = await Goal.create({
      text,
      user: req.user._id
  })

  if(goal) {
    res.status(StatusCodes.CREATED).json(goal)
  } else {
    res.status(StatusCodes.BAD_REQUEST);
    throw Error("Goal not created")
  }
  
});


const getSingleGoal = AsyncHandler(async (req, res) => {
  const { id } = req.params
  const goal = await Goal.findOne({_id: id})
  if(goal) {
    res.status(StatusCodes.OK).json(goal)
  } else {
    res.status(StatusCodes.BAD_REQUEST)
    throw Error("Goal does not exist")
  }
});


const updateGoal = AsyncHandler(async (req, res) => {
  const goal = await Goal.findOne({_id: req.params.id})

  if(!goal) {
    res.status(StatusCodes.NOT_FOUND)
    throw Error("goal not found")
  }


  if(!req.user) {
    res.status(StatusCodes.NOT_FOUND)
    throw Error("user not found")
  }

  if (goal.user.toString() !== req.user._id.toString()) {
    throw new Error("User not authorized")
  }

  const updatedGoal = await Goal.findOneAndUpdate({user: req.user._id}, { text: req.body.text}, { new: true})

  res.status(StatusCodes.OK).json(updatedGoal)



});


const deleteGoal = AsyncHandler(async (req, res) => {
  const goal = await Goal.findById({_id: req.params.id});

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }



  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await goal.delete();

  res.status(200).json({ id: req.params.id, status: 'success' });

});

module.exports = {
  getAllGoals,
  getSingleGoal,
  updateGoal,
  createGoal,
  deleteGoal,
};