import React ,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import  ICountry  from 'country-state-city';



const Postroom = () => {
  const Allcountry = ICountry.getAllCountries();
  const navigate = useNavigate();
  const [userData , setUserData] = useState({});
  const [email , setEmail]  = useState("");

  const [countryID , setCountryID] = useState(-1);
  const [country , setCountry] = useState("");
  const [stateID , setStateID] = useState(-1);
  const [state , setState] = useState("");
  const [stateData , setStateData] = useState([]);
  const [cityID , setCityID] = useState(-1);
  const [city , setCity] = useState("");
  const [cityData , setCityData] = useState([]);

  const callprofilePage = async () =>{
    try{
      const res = await fetch(`${process.env.REACT_APP_PATH}/profile` , {
        method:'GET',
        headers:{
          'Origin':`${process.env.REACT_APP_PATH}`,
          Accept:"application/json",
          "Content-Type":"application/json",
        },
        credentials:"include"
      });
  
      const data = await res.json();
      
      setUserData(data);
  
      
      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }
    }
    catch(err){
   navigate('/login');
    }
  }
  useEffect(()=>{
    document.title=`post room details`;
    const email1 = localStorage.getItem('email');
    if(!email1)
     navigate("/login")
    setEmail(email1)
    callprofilePage();
  },[])


  const [user ,setUser] = useState({
  roomrenterName:"",
   email:"",
   country:"",
   state:"",
   city:"",
   mobile:"",
   place:"",
   roomtype:"",
   location:"",
   price:""
  });

  let name  , value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({...user , [name]:value});
  }




const PostData = async (e) => {
  e.preventDefault();
  const {roomrenterName , mobile , place , roomtype , location , price } = user;
  
 
  const res = await fetch(`${process.env.REACT_APP_PATH}/roomupload`,{
    method:'POST',
    headers:{
      'Origin':`${process.env.REACT_APP_PATH}`,
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      roomrenterName ,email,country , state ,city, mobile , place , roomtype, location,price
    })
  })

  // const data = await res.json();
  
   if(res.status===201){
    window.alert("Post room Successfully");

    navigate("/");
   }
   else{
    window.alert("Invalid Data");
   }
}





useEffect(() => {
  // This will run when countryID changes
  if (countryID!== -1) {
    const fetchStates = async () => {
      try {
        const val = await ICountry.getStatesOfCountry(countryID);
        setStateData(val);
      } catch (error) {
        setStateData([]);
        console.error('Error fetching states:', error);
      }
    };

    fetchStates();
  }

  if(stateID!==-1){
    const fetchCity = async () =>{
      try{
        const val = await ICountry.getCitiesOfState(stateID);
        setCityData(val)
      }catch(err){
        setCityData([])
      }
    }
    fetchCity()
  }
}, [countryID, stateID,cityID]);

  return (
    <>
    <div className='post_room_page_head'>
    
    <br /><br />
      <form className='postroomdetails'>
      <h4>Fill Your Room Details</h4>

      <span>Name </span> <input name='roomrenterName'  type="text" placeholder='Enter Your Name' className='postforminp'
        value={user.roomrenterName}
        onChange={handleInputs}
        required="required"
      /><br />

{/* <span>Email </span> <input name='email'  type="text" placeholder='Enter Register EmailID' className='postforminp'
        value={user.email}
        onChange={handleInputs}
        required="required"
      /><br /> */}


{/* // selecting the country */}
<select onChange={(e)=>{ setCountryID(e.target.value); setCountry(e.target.selectedOptions[0].getAttribute('data'));}} required>

     <option value={-1}>Select Country</option>
      { 
        Allcountry.map((elem , index)=>{
          return <option key={index} value={elem.id} data={elem.name} >{elem.name}</option>
        })
      }
     </select>

<br /><br />


      {/* selecting the state */}

      <select onChange={(e)=>{setStateID(e.target.value); setState(e.target.selectedOptions[0].getAttribute('data'))}} required>

   <option value={-1}>Select State</option>
   {
      countryID !== -1 ?
      stateData.map((elem, ind) => (
         <option key={ind} value={elem.id} data={elem.name}>{elem.name}</option>
      ))
      :
      <option>Select country first</option>
   }
</select>


<br /><br />

 {/* selecting the city */}

 <select onChange={(e)=>{setCityID(e.target.value); setCity(e.target.selectedOptions[0].getAttribute('data'))}} required>
   <option value={-1}>Select City</option>
   {
      stateID !== -1 ?
      cityData.map((elem, ind) => (
         <option key={ind} value={elem.id} data={elem.name}>{elem.name}</option>
      ))
      :
      <option>Select State first</option>
   }
</select>
   
   <br /><br />



       {/* <span>Email* </span> <input name='email'  type="text" placeholder='Enter Your Register Email' className='postforminp'
        value={user.email}
        onChange={handleInputs}
      /><br /> */}

      {/* <span>City Name* </span> <input name='City' type="text" placeholder='Enter the City' className='postforminp'
          value={user.City}
          onChange={handleInputs}
      /><br /> */}
        

      <span>mobile Number*</span> <input name='mobile' type="text" placeholder='Enter Mobile Number' className='postforminp'
        value={user.mobile}
        onChange={handleInputs}
        required="required"
      /> <br />


<span>Area*</span> <input name='place' type="text" placeholder='Enter Area' className='postforminp'
         value={user.place}
         onChange={handleInputs}
         required="required"
      /> <br />

<span> Room Types*</span> <input name='roomtype' type="text" placeholder='eg - family or all' className='postforminp'
         value={user.roomtype}
         onChange={handleInputs}
         required="required"
      /><br />

<span>Location</span> <input name='location' type="url" placeholder='Enter your Location From map' className='postforminp'
    value={user.location}
    onChange={handleInputs}
/>
<br /><br />

      {/* <span>Pin Code* </span> <input name='Pincode' type="Number" placeholder='Enter the Pincod' className='postforminp' 
        value={user.Pincode}
        onChange={handleInputs}
      /><br /> */}
    
     
      <span>Price</span> <input name='price' type="text" placeholder='Enter the Price' className='postforminp'
         value={user.price}
         onChange={handleInputs}
         required="required"
      /> <br />
      
      {/* <span>Room Details*</span> <input name='RoomType' type="TEXT" placeholder='eg - 2 Room , 1 Bath Room , 1 Kichen + Hall all Are Seperate ' className='postforminp'
         value={user.RoomType}
         onChange={handleInputs}
      /> <br /> */}
      <input type="submit" value="Submit" className='searchbtn' onClick={PostData}/>
      </form>
      <br /><br />
    </div>
  
    </>
  )
}

export default Postroom
