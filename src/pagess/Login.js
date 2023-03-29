import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [email , setEmail] = useState('');
  const [password , setpassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch('/signin' , {
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email , password
      })
    })
    const data = await res.json();

    if(res.status === 400 || !data) {
      window.alert("Invalid Login Details");
    }
    else{
      window.alert(" Login Successfully");
      console.log(" Registration Successfully");
      navigate("/");
    }
  }
  useEffect(()=>{
    document.title=`user Login`;
  });
  return (
    <>
       <br /><br />
      <form className='loginfield'>
      <h1>Login</h1>
       <input type="text" placeholder='Enter Your Email' className='postforminp' autoComplete='off'
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
       /><br />
       <input type="email" placeholder='Enter Your Password' className='postforminp' autoComplete='off'
        value={password}
        onChange={(e)=> setpassword(e.target.value)}
       /><br />
       <input type="submit" value="Login" className='searchbtn' onClick={loginUser}/>
     </form>
    </>
  )
}

export default Login  

