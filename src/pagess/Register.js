import React ,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const navigate = useNavigate();
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

    const res = await fetch(`${process.env.REACT_APP_PATH}/register`,{
      method:'POST',
      headers:{
        'Origin':`${process.env.REACT_APP_PATH}`,
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        name , email , password,cpassword
      })
    })

    const data = await res.json();

    if(data.status === 422 || !data){
      window.alert("Invalid Registration");
    }
    else{
      window.alert(" Registration Successully");

      navigate("/login");
    }
  }
  useEffect(()=>{
    document.title=`user Sign Up`;
    const email1 = localStorage.getItem('email');
    if(email1){
      navigate("/");
    }
  } ,[]);
  return (
    <>
      <br /><br />
      <form className='loginfield'>
      <h1>Sign Up</h1>
       <input type="text" placeholder='Enter Your Name' name="name" className='postforminp' autoComplete='off'
        value={user.name}
        onChange={handleInputs}
       /><br />
       <input type="email" placeholder='Enter Your Email' name="email" className='postforminp' autoComplete='off'
          value={user.email}
          onChange={handleInputs}
       /><br />
       <input type="password" placeholder='Create password' name="password" className='postforminp' autoComplete='off'
          value={user.password}
          onChange={handleInputs}
       /><br />
      <input type="password" placeholder='Confirm Password' name="cpassword" className='postforminp' autoComplete='off'
          value={user.cpassword}
          onChange={handleInputs}
      /> <br />
      <input type="submit" value="SignUp" className='searchbtn' onClick={PostData}/>
         </form>
    </>
  )
}

export default Register
