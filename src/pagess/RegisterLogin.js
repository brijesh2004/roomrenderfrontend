import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
const RegisterLogin = ({login , setLogin}) => {
    const [register , setRegister] = useState(false);
    const setChageLogin = ()=>{
        setRegister(true);
    }
    const setRegi = ()=>{
        setRegister(false);
    }
  return (

    <div className='register_login'>
       <div className='togglebtn'>
       <span onClick={setRegi} className={register?'':'one'}>Register</span>
       <span  onClick={setChageLogin} className={register?'one':''}>Login</span>
       </div>
       {register?<Login login={login} setLogin={setLogin}/>:<Register login={login} setLogin={setLogin}/>}
    </div>
  )
}

export default RegisterLogin
