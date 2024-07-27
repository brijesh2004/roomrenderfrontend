import React, { useEffect, useState } from "react";
import Spinner from './Loading';
import ICountry from 'country-state-city'
import Userprofile from "./Userprofile";
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();
  const country = ICountry.getAllCountries();
  const [userData, setUserData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [searchedValue, setSearchedValue] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const [email, setEmail] = useState("");

  const [countryID, setCountryID] = useState(-1);
  const [countryName, setCountryName] = useState("");

  const [state, setState] = useState([]);

  const [stateID, setStateID] = useState(-1);

  const [stateName, setStateName] = useState("");

  const [city, setCity] = useState([]);

  const [cityID, setCityID] = useState(-1);

  const [cityName, setCityName] = useState("");


  const SearchtheRoomPage = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_PATH}/api`, {
        method: "GET",
        headers: {
          'Origin': `${process.env.REACT_APP_PATH}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
      setLoading(false);
      setUserData(data[0].allrooms);

      setSearchedData(data[0].allrooms);
    } catch (err) {
      throw err
    }
  };

  useEffect(() => {
    document.title = `Search the room`;
    const email1 = localStorage.getItem('email');
    setEmail(email1)
    SearchtheRoomPage();


  }, []);

  useEffect(() => {
    if (Number(countryID) === -1) {
      setSearchedData(userData);
      setSearchedValue(userData);

    }
    else if (Number(countryID) !== -1 && Number(stateID) === -1) {
      const filteredData = userData.filter(
        (document) => document.country.toLowerCase() === countryName.toLowerCase()
      );
      setSearchedData(filteredData)
      setSearchedValue(filteredData)
    }
    else if (Number(countryID) !== -1 && Number(stateID) !== -1 && Number(cityID) === -1) {
      const filteredData = userData.filter(
        (document) => document.country.toLowerCase() === countryName.toLowerCase() && document.state.toLowerCase() === stateName.toLowerCase()
      );
      setSearchedData(filteredData)
      setSearchedValue(filteredData)
    }
    else if (Number(countryID) !== -1 && Number(stateID) !== -1 && Number(cityID) !== -1) {
      const filteredData = userData.filter(
        (document) => document.country.toLowerCase() === countryName.toLowerCase() && document.state.toLowerCase() === stateName.toLowerCase() && document.city.toLowerCase() === cityName.toLowerCase()
      );
      setSearchedData(filteredData)
      setSearchedValue(filteredData)
    }

    else {
      setSearchedData(userData);
      setSearchedValue(userData)
    }

  }, [countryID, stateID, cityID, countryName, stateName, cityName])



  useEffect(() => {
    // This will run when countryID changes
    if (countryID !== -1) {
      const fetchStates = async () => {
        try {
          const val = ICountry.getStatesOfCountry(countryID);
          setState(val);
        } catch (error) {
          setState([]);
          console.error('Error fetching states:', error);
        }
      };

      fetchStates();
    }

    if (stateID !== -1) {
      const fetchCity = async () => {
        try {
          const val = await ICountry.getCitiesOfState(stateID)
          setCity(val)
        } catch (err) {
          setCity([])
        }
      }
      fetchCity()
    }
  }, [countryID, stateID]);


  const handleInputs = (e) => {
    let value = e.target.value;
    setQuery(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const filteredData = searchedValue.filter(
      (document) => document.place.toLowerCase() === query.toLowerCase()
    );
    setSearchedData(filteredData);

  };


  return (
    <>
      <br />
      <br />
      {
        !email ? <center><h2>For Post your Room First Create Account </h2> </center> : ""
      }
      <br />
      <div className="list_home_page">
        <div className="list_name">
          <div className="country_city_state">
            <select onChange={(e) => { setCountryID(e.target.value); setCountryName(e.target.selectedOptions[0].getAttribute('data')) }}>
              <option value={Number(-1)} data="">Select Country</option>
              {
                country.map((elem, index) => {
                  return <option key={index} value={elem.id} data={elem.name}>{elem.name}</option>
                })
              }
            </select>
            <br /><br />


            <select onChange={(e) => { setStateID(e.target.value); setStateName(e.target.selectedOptions[0].getAttribute('data')) }}>
              <option value={Number(-1)} data="">Select State</option>
              {
                countryID !== -1 ?
                  state.map((elem, ind) => (
                    <option key={ind} value={elem.id} data={elem.name}>{elem.name}</option>
                  ))
                  :
                  <option>Select country first</option>
              }
            </select>

            <br /><br />


            <select onChange={(e) => { setCityID(e.target.value); setCityName(e.target.selectedOptions[0].getAttribute('data')) }}>
              <option value={Number(-1)} data="">Select City</option>
              {
                stateID !== -1 ?
                  city.map((elem, ind) => (
                    <option key={ind} value={elem.id} data={elem.name}>{elem.name}</option>
                  ))
                  :
                  <option>Select State first</option>
              }
            </select>

            <br /><br />



            <div className="country_city_state setWidth">
              {
                Number(countryID !== -1) && Number(stateID) !== -1 && Number(cityID) !== -1 ?
                  <form className="searchform">
                    <input
                      type="text"
                      placeholder="Search Area"
                      className="searchinp"
                      onChange={handleInputs}
                    />
                    <br />
                    <input type="submit" value="Search" className="searchbtn" onClick={handleSearch} />
                  </form> : ""
              }
            </div>
          </div>
        </div>



        <div className="user_search_list">
          {Loading && <Spinner />}
          <div className="search_details">
            {!Loading && searchedData.map((document) => (
              <div key={document._id} className="search_result_box">
                <p className="status_details">open</p>
                <p><span className="room_details">Name</span> - {document.roomrenterName}</p>
                <p><span className="room_details">Country </span> - {document.country}</p>
                <p><span className="room_details">State</span>  - {document.state}</p>
                <p><span className="room_details">City</span>  - {document.city}</p>
                <p><span className="room_details">Mobile</span>  - {document.mobile}</p>
                <p><span className="room_details">Area</span>  - {document.place}</p>
                <p><span className="room_details">Price</span>  - {document.price}</p>
                <p><span className="room_details">Types</span>  - {document.roomtype}</p>
                <p><span className="room_details">Uploaded Date</span>  - {document.date.slice(0, 10).split('-').reverse().join('-')}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <a href={`${document.location}`} target="_blank">
                      Go To Map
                    </a>
                  </div>
                  <div>
                    <button className="visit_profile_btn" onClick={() => navigate(`/user/${document.userId}`)}>
                      Visit Profile
                    </button>
                  </div>
                </div>
                <br />
              </div>
            ))}
            {searchedData.length === 0 && <div>

              <center> {!Loading && <h1>No Data </h1>}</center>
            </div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
