import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const nevigate = useNavigate();
    const [data , setData] = useState({
        email:'',
        newpassword:'',
        cnewpassword:''
    });

    const HandleInput = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setData({ ...data , [name]:value});
    }

    const ChangePass = async (e) => {
     const {email , newpassword , cnewpassword}=data;
      e.preventDefault();
      const res = await fetch(`${process.env.REACT_APP_PATH}/changePass` , {
        method:'POST',
        credentials:'include',
        headers:{
          'Origin':`${process.env.REACT_APP_PATH}`,
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email , newpassword , cnewpassword
        })
      })
      const resdata= await res.json();
      
      if(newpassword!==cnewpassword){
        window.alert("Password are not matching");
      }
      if(res.status === 400 || !data) {
        window.alert("Invalid Login Details");
      }
      else{
        window.alert("Password change Successfully");
        
        nevigate('/login');
      }
    }
  return (
    <>
      <div className="changepassword">
       <form  className='changepasswordform'>
       <h4>Chage the password</h4>
        <input type="email" value={data.email} placeholder='Enter the email ' onChange={HandleInput} name='email' autoComplete='off'/> <br />
        <input type="password" value={data.newpassword} placeholder='Create a New Password' onChange={HandleInput} name='newpassword'/><br />
        <input type="password" value={data.cnewpassword} placeholder='Enter the Password Again' onChange={HandleInput} name='cnewpassword'/><br />
        <button className='searchbtn' onClick={ChangePass}>Submit</button>
       </form>
      </div>
    </>
  )
}

export default ChangePassword
