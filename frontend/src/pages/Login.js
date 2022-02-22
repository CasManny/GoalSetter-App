import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import Spinner from '../components/Spinner'
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { reset } from '../features/auth/authSlice'

const Login = () => {
  
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const {isLoading,user, isError, isSuccess, message} = useSelector((state) => state.auth)

  const { email, password } = formData;
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {email, password}
    dispatch(login(userData))
    
  };
  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset())
    }

    if(isSuccess || user) {
      navigate('/')
    }

  }, [isSuccess,user, navigate, message, isError, dispatch])

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p> Login to your GoalSetter Account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              name={"email"}
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              name={"password"}
              value={password}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
