import React ,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';


const Register = ({login , setLogin}) => {
  const navigate = useNavigate();
  const [Register , setRegister] = useState("Register");

  const [user , setUser] = useState({
    name:"",email:"",password:"",cpassword:""
  });
  let name , value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({...user , [name]:value});
  }

  const PostData = async (e) => {
    e.preventDefault();
    const {name ,email , password , cpassword} = user;
    if(password!==cpassword){
      alert("password must be same");
    }
      setRegister("Register...");
    const res = await fetch(`${process.env.REACT_APP_PATH}/register`,{
      method:'POST',
      credentials:"include",
      headers:{
        'Origin':`${process.env.REACT_APP_PATH}`,
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        name , email , password,cpassword
      })
    })

    const data = await res.json();
    setRegister("Register");
    if(data.status === 422 || !data){
      window.alert("Invalid Registration");
    }
    else{
      window.alert(" Registration Successully");
      setLogin(true);
      navigate("/");
    }
  }
  useEffect(()=>{
    document.title=`user Sign Up`;
    if(login){
      navigate("/")
    }
  } ,[login]);
  return (
    <>
      <br /><br />
      <form className='loginfield'>
       <label htmlFor="name" className='level'>Name:</label>
       <input type="text" placeholder='Enter Your Name' name="name" className='postforminp' autoComplete='off'
        value={user.name}
        onChange={handleInputs}
       /><br />
        <label htmlFor="email" className='level'>Email:</label>
       <input type="email" placeholder='Enter Your Email' name="email" className='postforminp' autoComplete='off'
          value={user.email}
          onChange={handleInputs}
       /><br />
        <label htmlFor="password" className='level'>Password:</label>
       <input type="password" placeholder='Create password' name="password" className='postforminp' autoComplete='off'
          value={user.password}
          onChange={handleInputs}
       /><br />
        <label htmlFor="cpassword" className='level'>Confirm Password:</label>
      <input type="password" placeholder='Confirm Password' name="cpassword" className='postforminp' autoComplete='off'
          value={user.cpassword}
          onChange={handleInputs}
      /> <br />
      <input type="submit" value={Register} className='searchbtn' onClick={PostData}/>
         </form>
    </>
  )
}

export default Register
