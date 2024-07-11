import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [cred,setCred]=useState({email:"",password:""});
    let navigate=useNavigate();
  

    const hs=async (e)=>{
       e.preventDefault();
       const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
  
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({email:cred.email,password:cred.password})
      });
      const json=await response.json()
      console.log(json)
      if(json.success){
        //save the auth token and redirect
        localStorage.setItem('token',json.token);
        navigate("/");                    
       

      }else{
      //  alert("Invalid email id")
      console.log("Invalid email id")
      }
    }
    const oc=(e)=>{                                
        setCred({...cred,[e.target.name]:e.target.value})   
        }

  return (

    <div>
     <form onSubmit={hs}>
  <div className="mb-3 my-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp"value={cred.email} onChange={oc}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label" >Password</label>
    <input type="password" className="form-control" name="password" id="password" value={cred.password} onChange={oc}/>
  </div>

  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login
