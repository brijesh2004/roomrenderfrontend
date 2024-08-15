import React,{useEffect} from 'react'
import { useNavigate} from 'react-router-dom';


const Logout = ({setLogin}) => {
  const navigate = useNavigate();
  const logout = async()=>{
    try{
      const res = await fetch(`${process.env.REACT_APP_PATH}/logout`,{
        method:'GET',
        credentials:"include",
        headers:{
          'Origin':`${process.env.REACT_APP_PATH}`,
          "Content-Type":"application/json"
        }
      })
      const data = await res.json();
      if(res.status===200){
        setLogin(false);
        navigate("/login");
      }
      else{
        throw Error;
      }
    }
    catch(err){
      alert("error");
     navigate("/");
    }
}

useEffect(()=>{
  logout();
})
  return (
    <div>
      <h1>Logout Page</h1>
    </div>
  )
}

export default Logout
