import React from 'react'
import { FaUser } from 'react-icons/fa'
const Register = () => {

  const [formData, setFormData] = React.useState({
    name:'',
    email: '',
    password: '',
    password2:''
  })

  const {name, email, password, password2 } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,[e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }
  console.log(formData)
  return (
    <>
    <section className="heading">
      <h1>
        <FaUser /> Register
      </h1>
      <p>Please create an account</p>
    </section>

    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" id='name' placeholder='Enter name' name={'name'} value={name} onChange={onChange}/>
        </div>
        <div className="form-group">
          <input type="email" className="form-control" id='email' placeholder='Enter your email' name={'email'} value={email} onChange={onChange}/>
        </div>
        <div className="form-group">
          <input type="password" className="form-control" id='password' placeholder='Enter your password' name={'password'} value={password} onChange={onChange}/>
        </div>
        <div className="form-group">
          <input type="password" className="form-control" id='password2' placeholder='confirm password' name={'password2'} value={password2} onChange={onChange}/>
        </div>
        <div className="form-group">

        <button type="submit" className="btn btn-block">Submit</button>
        </div>
      </form>
    </section>
    </>
  )
}

export default Register