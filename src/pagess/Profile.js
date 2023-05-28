import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Spinner from './Loading';



const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [Loading, setLoading] = useState(false);
  const [userroom, setUserroom] = useState([]);
  const callprofilePage = async () => {
    try {

      const res = await fetch('https://roomrenderbackend.onrender.com/profile', {
        method: 'GET',
        headers: {
          'Origin': 'https://roomrenderbackend.onrender.com',
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include"
      });

      const data = await res.json();
      // console.log(data);

      setUserData(data);
      // getting the user uploaded room 

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }

    }
    catch (err) {
      console.log(err);
      navigate('/login');
    }
  }

  const calltheroom = async () => {
    try {
      setLoading(true);
      const getroom = await fetch('https://roomrenderbackend.onrender.com/api', {
        method: 'GET',
        headers: {
          'Origin': 'https://roomrenderbackend.onrender.com',
          "Content-Type": "application/json",
        },
      });
      const getroomdata = await getroom.json();
      if (!getroom.status === 200) {
        const error = new Error(getroomdata.error);
        throw error;
      }
      setLoading(false);
      setUserroom(getroomdata);
    }
    catch (err) {
      console.log(err);
    }

  }


  useEffect(() => {
    document.title = `User Profile`;
    callprofilePage();
  });
  useEffect(() => {
    calltheroom();
  }, []);
  return (
    <>
      <div>
        <br /><br />
        <div className="profile_page_home">
          <div>
            <img src="https://th.bing.com/th/id/OIP.Qvf9UmzJS1V5YafT9NQZlAHaKL?pid=ImgDet&rs=1" alt="" />
          </div>
          <div className="profile_details">
            <h2>Name - {userData.name}</h2>
            Ranking 5/10
            <p>email - {userData.email}</p>
          </div>
        </div>

        <div className="youruploadroom">
          <h1 style={{ textAlign: 'center' }}>Here Are Your Uploaded room</h1>
          <div className="user_search_list">
            {Loading && <Spinner />}
            <div className="search_details">
              {!Loading && userroom.map((document) => (
                userData.email === document.email && (
                  <div key={document._id} className="search_result_box">
                    <p className="status_details">open</p>
                    <p><span className="room_details">Name</span> - {document.Name}</p>
                    {/* <p><span className="room_details">email</span> - {document.email}</p> */}
                    <p><span className="room_details">City </span> - {document.City}</p>
                    <p><span className="room_details">Pincode</span>  - {document.Pincode ? document.Pincode : "not given"}</p>
                    <p><span className="room_details">Type</span>  - {document.Type}</p>
                    <p><span className="room_details">Place</span>  - {document.Place}</p>
                    <p><span className="room_details">Price</span>  - {document.HouseNumber ? document.HouseNumber : "not given"}</p>
                    <p><span className="room_details">MoblieNumber</span>  - {document.MobileNumber}</p>
                    <p><span className="room_details">RoomType</span>  - {document.RoomType}</p>
                    <a
                      href={`https://www.google.co.in/maps/@26.6550204,83.2456535,16z?q=${document.Place
                        }`}
                    >
                      Go To Map
                    </a> <br />

                    <button className="deletebtn" onClick={async () => {
                      console.log(document._id);
                      const res = await fetch(`https://roomrenderbackend.onrender.com/api/myModel/${document._id}`, {
                        method: 'DELETE',
                        credentials: 'include',
                        headers: {
                          'Origin': 'https://roomrenderbackend.onrender.com',
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                        })
                      })
                      const data =await res.json();
                      if(data.status===404 || data.status===500){
                        alert("Error");
                      }
                      // console.log(data);
                      alert("Room data Delete Successfully");
                      navigate('/');


                    }}><i className="fa fa-trash"></i></button>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile;