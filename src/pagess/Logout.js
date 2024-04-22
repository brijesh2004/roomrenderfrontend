import React,{useEffect} from 'react'
import { useNavigate} from 'react-router-dom';


const Logout = () => {
  const navigate = useNavigate();


useEffect(()=>{
   localStorage.clear();
   navigate("/")
   window.location.reload(false)
})
  return (
    <div>
      <h1>Logout Page</h1>
    </div>
  )
}

export default Logout
