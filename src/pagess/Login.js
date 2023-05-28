import React, { createContext } from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const UserVarify = createContext();
const Login = () => {
  const navigate = useNavigate();
  const [email , setEmail] = useState('');
  const [password , setpassword] = useState('');
  const [userVarified , setUserVarified] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch('https://roomrenderbackend.onrender.com/signin' , {
      method:'POST',
      credentials:'include',
      headers:{
        'Origin':'https://roomrenderbackend.onrender.com',
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
      setUserVarified(true);
      navigate("/");
      window.location.reload(false);
    }
  }
  // function refreshPage() {
  //   window.location.reload(false);
  // }
  useEffect(()=>{
    document.title=`user Login`;
  });
  return (
    <>
       <br /><br />
       <UserVarify.Provider value={{userVarified}}>
      <form className='loginfield'>
      <h1>Login</h1>
       <input type="text" placeholder='Enter Your Email' className='postforminp' autoComplete='off'
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
       /><br />
       <input type="password" placeholder='Enter Your Password' className='postforminp' autoComplete='off'
        value={password}
        onChange={(e)=> setpassword(e.target.value)}
       /><br />
       <input type="submit" value="Login" className='searchbtn' onClick={loginUser}/> <br />
       <a href="/ChangePassword">Forget Password</a>
     </form>
     {/* {
      refreshPage()
     } */}
     </UserVarify.Provider>
    </>
  )
}

export default Login  
export {UserVarify}
