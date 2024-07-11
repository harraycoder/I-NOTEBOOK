import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';//The useNavigate hook is part of the react-router-dom package that allows programmatic routing inside a React application. The method returns a function that can be invoked with a URI Universal Resource Identifier to redirect the client to the respective page


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
        navigate("/");                    //This means it would redirect or render the component associated with the root route 
        //if you are click submit button on login page after then featc api show like this http://localhost:3000 and you can show all the data your add notes

      }else{
      //  alert("Invalid email id")
      console.log("Invalid email id")
      }
    }
    const oc=(e)=>{                                 //(e) is the parameter of the arrow function,
        setCred({...cred,[e.target.name]:e.target.value})   //Spread Operator (...):...note spreads the current state (note object) into a new object. This is done to ensure that the existing key-value pairs in the state are retained.
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
