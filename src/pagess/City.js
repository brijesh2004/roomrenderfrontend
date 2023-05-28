import React, { useEffect, useState } from "react";
import Spinner from './Loading';


const City = () => {

  const [avCity, setAvCity] = useState([]);
  const [loading , setLoading] = useState(false);
  const callTheCity = async () => {
    try {
      const res = await fetch('https://roomrenderbackend.onrender.com/api', {
        method: 'GET',
        headers: {
          'Origin': 'https://roomrenderbackend.onrender.com',
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
      // console.log(avCity);
    }
    catch (err) {
      console.log(err);
    }
  }
  let setValue = new Set();
  useEffect(() => {
    document.title = `City Available`;
  }, []);
  useEffect(() => {
    callTheCity();
  });
  return (
    <>
      <br /><br />
      <h2 style={{textAlign:'center'}}>Currenty We Have Room In these City</h2>

      {avCity.map((element) => {
        setValue.add(element.City);
      })}
      <div className="citydiv">
      {!loading &&<Spinner/>}
        { loading && Array.from(setValue).map((el) => (
          <span className="spanelement" key={el}>{el}</span>
        ))}
      </div>
    </>
  )
}

export default City;