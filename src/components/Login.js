import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({email:"", password:""})
   const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/api/auth/login',{
            method:"POST",
            headers:{
                "content-Type":"application/json"
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password})

        })
        const json = await response.json()
        console.log(json)
        if (json.sucess){
            localStorage.setItem('token', json.authToken);
            props.showAlert("Thank You !! Log In sucessfull Mahantesh" , "success") 
            navigate("/home");
        }
        else{
          props.showAlert("Invalid credentials" , "danger") 
        }
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
      }
      
  return (
    <div className="mt-3">
      <h2>Please Enter Your Email and Password Mahantesh for Log In.....</h2> <br />
<form onSubmit={handleSubmit}> 
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={onChange} id="email" value={credentials.email} name='email' aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onChange} value={credentials.password} id="password" name='password'/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
  )
}

export default Login
