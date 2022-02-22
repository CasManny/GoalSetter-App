import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice'
import { toast } from 'react-toastify'
import Spinner from './Spinner'


const GoalForm = () => {
    const [text, setText] = React.useState()
    const dispatch = useDispatch()
    const { goals, isLoading, isSuccess, isError, message} = useSelector((state) => state.goals)

    const onSubmit = (e) => {
        e.preventDefault()
        if(!text) {
            toast.error("field must not be empty")
            return;
        } else {
            dispatch(createGoal({text}))
            setText('')

        }
    }

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

    }, [isSuccess, isError, goals, message])

    if(isLoading) {
        return <Spinner />
    }

  return (
    <>
    <section className="form">
        <form onSubmit={onSubmit} >
            <div className="form-group">
                <label htmlFor="text">Goal</label>
                <input type="text" className="form-control" value={text} name={'text'} onChange={(e) => setText(e.target.value)} />
            </div>
            <button className="btn btn-block" type='submit'>Add Goal</button>
        </form>
    </section>
    </>
  )
}

export default GoalForm