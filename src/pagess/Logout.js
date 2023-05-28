import React,{useEffect} from 'react'
import { useNavigate} from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  // const [varified , setVarified] = useState(false);
  useEffect(()=>{
    fetch('https://roomrenderbackend.onrender.com/logout',{
        method:'GET',
        headers:{
          'Origin':'https://roomrenderbackend.onrender.com',
            Accept:"appication/json",
            "Content-Type":"application/json"
        },
        credentials:"include"
    }).then((res)=>{
   navigate('/Login');
   window.location.reload(false);
   if(res.status!==200){
      const error = new Error(res.error);
      throw error;
   }
    }).catch((err)=>{
  console.log(err);
    })
})
  return (
    <div>
      <h1>Logout Page</h1>
    </div>
  )
}

export default Logout
