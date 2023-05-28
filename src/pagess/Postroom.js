import React ,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
const Postroom = () => {
  const navigate = useNavigate();
  const [userData , setUserData] = useState({});

  const callprofilePage = async () =>{
    try{
      const res = await fetch('https://roomrenderbackend.onrender.com/profile' , {
        method:'GET',
        headers:{
          'Origin':'https://roomrenderbackend.onrender.com',
          Accept:"application/json",
          "Content-Type":"application/json",
        },
        credentials:"include"
      });
  
      const data = await res.json();
      // console.log(data);
      setUserData(data);
    //  console.log(userData);
      
      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }
    }
    catch(err){
      console.log(err);
   navigate('/login');
    }
  }
  useEffect(()=>{
    document.title=`post room details`;
    callprofilePage();
  },[])


  const [user ,setUser] = useState({
   Name:"",
   email:"",
   City:"",
   Pincode:"",
   Type:"",
   Place:"",
   HouseNumber:"",
   MobileNumber:"",
   RoomType:""
  });

  let name  , value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({...user , [name]:value});
  }
const PostData = async (e) => {
  e.preventDefault();
  const {Name , email , City ,Pincode, Type , Place , HouseNumber , MobileNumber , RoomType } = user;

  const res = await fetch('https://roomrenderbackend.onrender.com/postroom',{
    method:'POST',
    headers:{
      'Origin':'https://roomrenderbackend.onrender.com',
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      Name ,email , City ,Pincode, Type , Place , HouseNumber, MobileNumber,RoomType
    })
  })

  const data = await res.json();

  if(data.status === 422 || !data){
    window.alert("Invalid Data");
    console.log("Invalid Data");
   }
   else{
     window.alert("Post room Successfully");
     console.log("Post room Successfully Successully");

     navigate("/");
   }
}

  return (
    <>
    <div className='post_room_page_head'>
    
    <br /><br />
      <form className='postroomdetails'>
      <h4>Fill Your Room Details</h4>
      <span>Name* </span> <input name='Name'  type="text" placeholder='Enter Your Name' className='postforminp'
        value={user.Name}
        onChange={handleInputs}
      /><br />
       <span>Email* </span> <input name='email'  type="text" placeholder='Enter Your Register Email' className='postforminp'
        value={user.email}
        onChange={handleInputs}
      /><br />
      <span>City Name* </span> <input name='City' type="text" placeholder='Enter the City' className='postforminp'
          value={user.City}
          onChange={handleInputs}
      /><br />
      <span>Pin Code* </span> <input name='Pincode' type="Number" placeholder='Enter the Pincod' className='postforminp' 
        value={user.Pincode}
        onChange={handleInputs}
      /><br />
      <span> Room Types*</span> <input name='Type' type="text" placeholder='eg - family or all' className='postforminp'
         value={user.Type}
         onChange={handleInputs}
      /><br />
      <span>Area*</span> <input name='Place' type="text" placeholder='Enter Area' className='postforminp'
         value={user.Place}
         onChange={handleInputs}
      /> <br />
      <span>Price</span> <input name='HouseNumber' type="text" placeholder='Enter the Price' className='postforminp'
         value={user.HouseNumber}
         onChange={handleInputs}
      /> <br />
      <span>mobile Number*</span> <input name='MobileNumber' type="Number" placeholder='Enter Mobile Number' className='postforminp'
        value={user.MobileNumber}
        onChange={handleInputs}
      /> <br />
      <span>Room Details*</span> <input name='RoomType' type="TEXT" placeholder='eg - 2 Room , 1 Bath Room , 1 Kichen + Hall all Are Seperate ' className='postforminp'
         value={user.RoomType}
         onChange={handleInputs}
      /> <br />
      <input type="submit" value="Submit" className='searchbtn' onClick={PostData}/>
      </form>
      <br /><br />
    </div>
  
    </>
  )
}

export default Postroom
