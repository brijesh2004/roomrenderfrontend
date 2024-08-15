import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ICountry from 'country-state-city';



const Postroom = ({login}) => {
  const Allcountry = ICountry.getAllCountries();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [submit, setSubmit] = useState("Submit");
  const [countryID, setCountryID] = useState(-1);
  const [country, setCountry] = useState("");
  const [stateID, setStateID] = useState(-1);
  const [state, setState] = useState("");
  const [stateData, setStateData] = useState([]);
  const [cityID, setCityID] = useState(-1);
  const [city, setCity] = useState("");
  const [cityData, setCityData] = useState([]);

  const callprofilePage = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_PATH}/profile`, {
        method: 'GET',
        headers: {
          'Origin': `${process.env.REACT_APP_PATH}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include"
      });

      const data = await res.json();

      setUserData(data);


      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    }
    catch (err) {
      navigate('/login');
    }
  }
  useEffect(() => {
    document.title = `post room details`;
    if (!login)
      navigate("/login")
    callprofilePage();
  }, [login])


  const [user, setUser] = useState({
    roomrenterName: "",
    email: "",
    country: "",
    state: "",
    city: "",
    mobile: "",
    place: "",
    roomdetails: "",
    location: "",
    price: ""
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  }




  const PostData = async (e) => {
    e.preventDefault();
    const { roomrenterName, mobile, place, roomdetails, price } = user;

    setSubmit("Submiting...");
    const res = await fetch(`${process.env.REACT_APP_PATH}/roomupload`, {
      method: 'POST',
      credentials:"include",
      headers: {
        'Origin': `${process.env.REACT_APP_PATH}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        roomrenterName, country, state, city, mobile, place, roomdetails, price
      })
    })

    // const data = await res.json();
    setSubmit("Submiting");
    if (res.status === 201) {
      window.alert("Post room Successfully");
      navigate("/");
    }
    else {
      window.alert("Invalid Data");
      setSubmit("Submiting");
    }
  }





  useEffect(() => {
    // This will run when countryID changes
    if (countryID !== -1) {
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

    if (stateID !== -1) {
      const fetchCity = async () => {
        try {
          const val = await ICountry.getCitiesOfState(stateID);
          setCityData(val)
        } catch (err) {
          setCityData([])
        }
      }
      fetchCity()
    }
  }, [countryID, stateID, cityID]);

  return (
    <>
      <div className='post_room_page_head'>

        <br /><br />
        <form className='postroomdetails'>
          <h4>Fill Your Room Details</h4>
          <label htmlFor="roomrenterName" className='level'>Name:</label>
          <input name='roomrenterName' type="text" placeholder='Enter Your Name' className='postforminp'
            value={user.roomrenterName}
            onChange={handleInputs}
            required
          /><br />
          {/* // selecting the country */}
          <select onChange={(e) => { setCountryID(e.target.value); setCountry(e.target.selectedOptions[0].getAttribute('data')); }} required>

            <option value={-1}>Select Country</option>
            {
              Allcountry.map((elem, index) => {
                return <option key={index} value={elem.id} data={elem.name} >{elem.name}</option>
              })
            }
          </select>

          <br /><br />


          {/* selecting the state */}

          <select onChange={(e) => { setStateID(e.target.value); setState(e.target.selectedOptions[0].getAttribute('data')) }} required>

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

          <select onChange={(e) => { setCityID(e.target.value); setCity(e.target.selectedOptions[0].getAttribute('data')) }} required>
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

          <label htmlFor="mobile" className='level'>Mobile:</label>
          <input name='mobile' type="text" placeholder='Enter Mobile Number' className='postforminp'
            value={user.mobile}
            onChange={handleInputs}
            required
          /> <br />


          <label htmlFor="place" className='level'>Area:</label>
          <input name='place' type="text" placeholder='Enter Area' className='postforminp'
            value={user.place}
            onChange={handleInputs}
            required
          /> <br />

          <label htmlFor="roomdetails" className='level'>Rooms Details:</label>
          <input name='roomdetails' type="text" placeholder='eg - family or all , 2 BHK' className='postforminp'
            value={user.roomdetails}
            onChange={handleInputs}
            required
          /><br />
          <label htmlFor="price" className='level'>Price:</label>
          <input name='price' type="text" placeholder='Enter the Price' className='postforminp'
            value={user.price}
            onChange={handleInputs}
            required
          /> <br />


          <input type="submit" value={submit} className='searchbtn' onClick={PostData} />
        </form>
        <br /><br />
      </div>

    </>
  )
}

export default Postroom
