import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
const Header = () => {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/register')
    }
  return (
   <header className="header">
       <div className="logo">
           <Link to='/'>GoalSetter</Link>
       </div>
       <ul>
            <li>
                {user ? '' : (<Link to='/register'><FaUser />Register</Link>)}
            </li>
            <li>
                { user ? (<button className='btn' onClick={onLogout} > <FaSignOutAlt /> Logout</button>) : (<Link to='/login'> <FaSignInAlt /> Login</Link>)}
            </li>

       </ul>
   </header>
  )
}

export default Header