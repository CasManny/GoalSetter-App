import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'


const GoalItem = ({ goal }) => {
    const dispatch = useDispatch()

  return (
    <div className="goal">
        <div>
            { new Date(goal.createdAt).toLocaleString('en-Us')}
        </div>
        <h2>{goal.text}</h2>
        <button className="close" onClick={() => dispatch(deleteGoal(goal._id))}> <FaTimes /> </button>
    </div>
  )
}

export default GoalItem