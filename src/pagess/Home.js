import React, { useEffect, useState } from "react";
import Spinner from './Loading';

const Home = () => {
  const [userData, setUserData] = useState([]);
  const [Loading , setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const SearchtheRoomPage = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://roomrenderbackend.onrender.com/api", {
        method: "GET",
        headers: {
          'Origin':'https://roomrenderbackend.onrender.com',
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
      setLoading(false);
      setUserData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    SearchtheRoomPage();
  }, []);

  useEffect(()=>{
    document.title=`Search the room`;
  })

  const handleInputs = (e) => {
    let value = e.target.value;
    setQuery(value);
  };
  
  const handleSearch = (e) => {
    e.preventDefault();

    const filteredData = userData.filter(
      (document) => document.City.toLowerCase() === query.toLowerCase()
    );
  
    setUserData(filteredData);
  };

  return (
    <>
      <br />
      <br />
      <form className="searchform" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search City"
          className="searchinp"
          onChange={handleInputs}
        />
        <input type="submit" value="Search" className="searchbtn" />
      </form>
      <div className="user_search_list">
      {Loading&&<Spinner/>}
        <div className="search_details">
          {!Loading && userData.map((document) => (
            <div key={document._id} className="search_result_box">
              <p className="status_details">open</p>
              <p><span className="room_details">Name</span> - {document.Name}</p>
              <p><span className="room_details">City </span> - {document.City}</p>
              <p><span className="room_details">Pincode</span>  - {document.Pincode?document.Pincode:"not given"}</p>
              <p><span className="room_details">Type</span>  - {document.Type}</p>
              <p><span className="room_details">Place</span>  - {document.Place}</p>
              <p><span className="room_details">Price</span>  - {document.HouseNumber?document.HouseNumber:"not given"}</p>
              <p><span className="room_details">MoblieNumber</span>  - {document.MobileNumber}</p>
              <p><span className="room_details">RoomType</span>  - {document.RoomType}</p>
              <a
                href={`https://www.google.co.in/maps/@26.6550204,83.2456535,16z?q=${
                  document.Place
                }`}
              >
                Go To Map
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
