import React, { createContext } from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const Login = ({login , setLogin}) => {
  const navigate = useNavigate();
  const [email , setEmail] = useState('');
  const [password , setpassword] = useState('');
  const [LoginBtn , setLoginBtn] = useState("Login");


  const loginUser = async (e) => {
    e.preventDefault();
    setLoginBtn("Login...")
    const res = await fetch(`${process.env.REACT_APP_PATH}/signin` , {
      method:'POST',
      credentials:'include',
      headers:{
        'Origin':`${process.env.REACT_APP_PATH}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email , password
      })
    })
    const data = await res.json();
    setLoginBtn("Login")
    if(res.status === 400 || !data) {
      window.alert("Invalid Login Details");
    }
    else{
      window.alert(" Login Successfully");
      setLogin(true);
      navigate("/");
    }
  }
  useEffect(()=>{
    document.title=`user Login`;
    if(login){
      navigate("/")
    }
  },[login]);
  return (
    <>
       <br /><br />
       <div>
      <form className='loginfield'>
      <label htmlFor="email" className='level'>Email:</label>
       <input type="text" placeholder='Enter Your Email' className='postforminp' autoComplete='off'
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
       /><br />
       <label htmlFor="password" className='level'>Password:</label>
       <input type="password" placeholder='Enter Your Password' className='postforminp' autoComplete='off'
        value={password}
        onChange={(e)=> setpassword(e.target.value)}
       /><br />
       <input type="submit" value={LoginBtn} className='searchbtn' onClick={loginUser}/> <br />
     </form>
     </div>
    </>
  )
}

export default Login  
