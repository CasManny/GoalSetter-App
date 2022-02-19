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
  const { id } = req.params
  const { text } = req.body
  const goal = await Goal.findOne({_id: id})

  if(!goal) {
    res.status(StatusCodes.NOT_FOUND)
    throw Error("User not found")
  }

  const user = await User.findById(req.user._id)

  if(!user) {
    res.status(StatusCodes.NOT_FOUND)
    throw Error("user not found")
  }

 if(goal.user.toString() !== user.id) {
  
   res.status(StatusCodes.UNAUTHORIZED)
   throw Error('unauthorized')
 }

  const updatedGoal = await Goal.findOneAndUpdate({_id: id}, {text: text}, {new: true})
  res.status(StatusCodes.OK).json(updatedGoal)
});

const deleteGoal = AsyncHandler(async (req, res) => {
  const {id } = req.params
  const goal = await Goal.findOne({_id: id})
  if(!goal) {
    res.status(StatusCodes.NOT_FOUND)
    throw Error('goal not found')
  }

  const user = await User.findById(req.user._id)
  if(!user) {
    res.status(StatusCodes.NOT_FOUND)
    throw Error('User not found')
  }

  if (goal.user.toString() !== user.id) {
    res.status(StatusCodes.UNAUTHORIZED);
    throw Error("unauthorized");
  }
  await Goal.deleteOne({_id: id})
  res.status(StatusCodes.OK).json({status: 'success', id: req.params.id})


  
});

module.exports = {
  getAllGoals,
  getSingleGoal,
  updateGoal,
  createGoal,
  deleteGoal,
};