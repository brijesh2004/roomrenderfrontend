import React, { useEffect, useState } from "react";
import '../style/homepage.css';
import RoomItem from "../components/RoomItem";

const Home = () => {
  const [pageNumber , setPageNumber] = useState(1);
  const [searchedData, setSearchedData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [city , setCity] = useState('');
  const [area , setArea] = useState('');
  
 

  const SearchtheRoomPage = async (page=1) => {
    try {
      setPageNumber(page);
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_PATH}/api?page=${page}&city=${city}&place=${area}`, {
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
      setSearchedData(data.data);
    } catch (err) {
      setLoading(false);
    }
  };


 


  useEffect(() => {
    document.title = `Search the room`;
    SearchtheRoomPage();
  }, []);

  
  
  return (
    <> 
      <div className="list_home_page">
      <div className="search_item">
        <input type="text" placeholder="Enter the City" onChange={(e)=>setCity(e.target.value)}/>
        <input type="text" placeholder="Enter Area" onChange={(e)=>setArea(e.target.value)}/>
        <button onClick={()=>SearchtheRoomPage(1)}>Search</button>
      </div>
        <RoomItem searchedData={searchedData} Loading={Loading} isAdmin={false}/>
        <div className="next_prev_btn">
        <button onClick={() => SearchtheRoomPage(pageNumber - 1)} disabled={pageNumber === 1}>	&#8592; Prev</button>
        <button onClick={() => SearchtheRoomPage(pageNumber + 1)} disabled={searchedData.length <=2}>Next &#8594;</button>
        </div>
      </div>
    </>
  );
};

export default Home;
