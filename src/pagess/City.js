import React, { useEffect, useState } from "react";
import Spinner from './Loading';

const City = () => {
  
  const [avCity, setAvCity] = useState([]);
  const [loading , setLoading] = useState(false);
  const callTheCity = async () => {
    try {
        setLoading(false)
        const res = await fetch(`${process.env.REACT_APP_PATH}/getcity`, {
        method: 'GET',
        headers: {
          'Origin': `${process.env.REACT_APP_PATH}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      

      if (!data.status === 200) {
        const err = new Error("error on the city page");
        throw err;
      }

      setAvCity(data);
      setLoading(true);
     
    }
    catch (err) {
      throw err
    }
  }
  useEffect(() => {
    document.title = `City Available`;
  }, []);
  useEffect(() => {
    callTheCity();
  } ,[]);
  return (
    <>
      <br /><br />
      <h2 style={{textAlign:'center'}}>Total Rooms Available in city</h2>

      
      <div className="citydiv">
      {!loading &&<Spinner/>}
      {avCity.map((element , ind) => {
       return <span className="spanelement" key={ind} >{element.city}    {element.count>=1000?element.count/1000+"K":element.count}</span>
      })}
      </div>
    </>
  )
}

export default City;