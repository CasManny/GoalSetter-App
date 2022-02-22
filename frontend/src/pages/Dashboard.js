import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message} = useSelector((state) => state.goals)

  useEffect(() => {
    if(!user) {
      navigate('/login')
    }

    if(isError) {
      toast.error(message)
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, message, isError, dispatch])

  if(isLoading) {
    return <Spinner />
  }
  return (
    <>
      <section className="heading">
        <h1 style={{ textTransform: "capitalize" }}>welcome { user? user.name : ''}</h1>
        <p>Goal Dashboard</p>
      </section>
      <GoalForm />
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (<h3>You have not set any goals </h3>)}
      </section>
    </>
  );
};

export default Dashboard;
