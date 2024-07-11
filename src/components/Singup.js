import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Singup = () => {
  
        const [cred,setCred]=useState({name:"",email:"",password:"",cpassword:""});
        let navigate=useNavigate();
        
        const hs=async (e)=>{
        e.preventDefault();
        
        const response = await fetch("http://localhost:5000/api/auth/createuser", {  
         method: "POST",
   
         headers: {
           "Content-Type": "application/json",
         },
         body:JSON.stringify({name:cred.name,email:cred.email,password:cred.password})
       });
       const json=await response.json()
       console.log(json)
       if(json.success){
       
         localStorage.setItem('token',json.token);
         navigate("/");                  
 
       }else{
         alert("Invalid email id")
       }
     }
     const oc=(e)=>{                               
         setCred({...cred,[e.target.name]:e.target.value}) 
         }        
 
  return (
    <div className='container my-3'>
      <form onSubmit={hs}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={oc} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={oc} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={oc} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Conform Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={oc} minLength={5} required/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Singup
