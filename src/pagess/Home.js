import React, { useEffect, useState } from "react";
import Spinner from './Loading';
import ICountry from 'country-state-city';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [pageNumber , setPageNumber] = useState(1);
  const country = ICountry.getAllCountries();
  // const [userData, setUserData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [countryName, setCountryName] = useState({
    name: '',
    id: ''
  });
  const [state, setState] = useState([]);
  const [stateName, setStateName] = useState({
    name: '',
    id: ''
  });
  const [city, setCity] = useState([]);
  const [cityName, setCityName] = useState({
    name: '',
    id: ''
  });
  
  const formatDate = (timestamp) => {
    const time = Number(timestamp);
    if (isNaN(time)) {
      return 'Invalid Date';
    }
    const date = new Date(time);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return date.toLocaleString();
  };

  const SearchtheRoomPage = async (page=1) => {
    try {
      setPageNumber(page);
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_PATH}/api?page=${page}&country=${countryName.name}&state=${stateName.name}&city=${cityName.name}&place=${query}`, {
        method: "GET",
        credentials: "include",
        headers: {
          'Origin': `${process.env.REACT_APP_PATH}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!(res.status === 200)){
        const error = new Error(res.error);
        throw error;
      }
      setLoading(false);
      // setUserData(data.data);
      setSearchedData(data.data);
    } catch (err) {
      // console.error(err);
      setLoading(false);
    }
  };

  const handleInputs = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    document.title = `Search the room`;
    SearchtheRoomPage();
  }, [countryName, stateName, cityName]);

  useEffect(() => {
    if (countryName.id) {
      const stateList = ICountry.getStatesOfCountry(countryName.id);
      setState(stateList);
      setStateName({ name: '', id: '' });
      setCity([]);
      setCityName({ name: '', id: '' });
    } else {
      setState([]);
      setStateName({ name: '', id: '' });
      setCity([]);
      setCityName({ name: '', id: '' });
    }
  }, [countryName]);
  
  useEffect(() => {
    if (stateName.id) {
      const cityList = ICountry.getCitiesOfState(stateName.id);
      setCity(cityList);
      setCityName({ name: '', id: '' });
    } else {
      setCity([]);
      setCityName({ name: '', id: '' });
    }
  }, [stateName]);
  
  return (
    <>
      <br />
      <br />
      <br />
      <div className="list_home_page">
        <div className="list_name">
          <div className="country_city_state">
            <select 
              onChange={(e) => {
                setCountryName({
                  name: e.target.selectedOptions[0].getAttribute('data'),
                  id: e.target.value
                });
                setState([]);
                setCity([]);
                setStateName({ name: '', id: '' });
                setCityName({ name: '', id: '' });
              }}
            >
              <option value="" data="">Select Country</option>
              {
                country.map((elem, index) => (
                  <option key={index} value={elem.id} data={elem.name}>{elem.name}</option>
                ))
              }
            </select>
            <br /><br />

            <select 
              onChange={(e) => {
                setStateName({
                  name: e.target.selectedOptions[0].getAttribute('data'),
                  id: e.target.value
                });
                setCity([]);
                setCityName({ name: '', id: '' });
              }}
              value={stateName.id}
            >
              <option value="" data="">Select State</option>
              {
                countryName.id !== "" ?
                  state.map((elem, ind) => (
                    <option key={ind} value={elem.id} data={elem.name}>{elem.name}</option>
                  ))
                  :
                  <option>Select country first</option>
              }
            </select>

            <br /><br />

            <select 
              onChange={(e) => {
                setCityName({
                  name: e.target.selectedOptions[0].getAttribute('data'),
                  id: e.target.value
                });
              }}
              value={cityName.id}
            >
              <option value="" data="">Select City</option>
              {
                stateName.id !== "" ?
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
                countryName.id && stateName.id && cityName.id ?
                  <form className="searchform" onSubmit={(e) => { e.preventDefault(); SearchtheRoomPage(); }}>
                    <input
                      type="text"
                      placeholder="Search Area"
                      className="searchinp"
                      value={query}
                      onChange={handleInputs}
                    />
                    <br />
                    <input type="submit" value="Search" className="searchbtn" />
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
                <p><span className="room_details">Types</span>  - {document.roomdetails}</p>
                <p><span className="room_details">Date</span>  - {formatDate(document.CreatedAt)}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${document.place},${document.city},${document.state},${document.country}`} target="_blank" rel="noreferrer">
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
        <div className="next_prev_btn">
        <button onClick={() => SearchtheRoomPage(pageNumber - 1)} disabled={pageNumber === 1}>	&#8592; Prev</button>
        <button onClick={() => SearchtheRoomPage(pageNumber + 1)} disabled={searchedData.length <=2}>Next &#8594;</button>
        </div>
      </div>
    </>
  );
};

export default Home;
