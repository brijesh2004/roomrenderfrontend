import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
const RegisterLogin = () => {

    const [register , setRegister] = useState(false);
    const setLogin = ()=>{
        setRegister(true);
    }
    const setRegi = ()=>{
        setRegister(false);
    }
  return (

    <div className='register_login'>
       <div className='togglebtn'>
       <span onClick={setRegi} className={register?'':'one'}>Register</span>
       <span  onClick={setLogin} className={register?'one':''}>Login</span>
       </div>
       {register?<Login/>:<Register/>}
    </div>
  )
}

export default RegisterLogin
