import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Spinner from './Loading';

const Profile = ({ login }) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [Loading, setLoading] = useState(false);

  const [userroom, setUserroom] = useState([]);

  
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

  const callprofilePage = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.REACT_APP_PATH}/profile`, {
        method: 'GET',
        credentials: "include",
        headers: {
          'Origin': `${process.env.REACT_APP_PATH}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      });

      const data = await res.json();
      setLoading(false)
      // setUserroom(data.rooms);
      // setUserData(data);
      // setUserId(data._id);
      // getting the user uploaded room 
      setUserData(data.data);
      setUserroom(data.rooms)

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }

    }
    catch (err) {
      navigate('/Login');
    }
  }




  useEffect(() => {
    document.title = `User Profile`;
    if (login)
      callprofilePage();
    else
      navigate("/login")
  }, [login]);

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
            <p>email - {userData.email}</p>
          </div>
        </div>

        <div className="youruploadroom">
          <h1 style={{ textAlign: 'center' }}>Here Are Your Uploaded room</h1>
          <div className="user_search_list">
            {Loading && <Spinner />}
            <div className="search_details">
              {!Loading && userroom.map((document) => (
                <div key={document._id} className="search_result_box">
                  <p className="status_details">open</p>
                  <p><span className="room_details">Name</span> - {document.roomrenterName}</p>
                  {/* <p><span className="room_details">email</span> - {document.email}</p> */}
                  <p><span className="room_details">Country </span> - {document.country}</p>
                  <p><span className="room_details">State</span>  - {document.state}</p>
                  <p><span className="room_details">City</span>  - {document.city}</p>
                  <p><span className="room_details">Mobile</span>  - {document.mobile}</p>
                  <p><span className="room_details">Area</span>  - {document.place}</p>
                  <p><span className="room_details">Price</span>  - {document.price}</p>
                  <p><span className="room_details">Date</span>  - {formatDate(document.CreatedAt)}</p>
                  <button className="deletebtn" onClick={async () => {
                    const res = await fetch(`${process.env.REACT_APP_PATH}/delete/myModel/${document._id}`, {
                      method: 'DELETE',
                      credentials: 'include',
                      headers: {
                        'Origin': `${process.env.REACT_APP_PATH}`,
                        "Content-Type": "application/json"
                      }
                    })
                    const data = await res.json();
                    if (data.status === 404 || data.status === 500) {
                      alert("Error");
                    }

                    alert("Room data Delete Successfully");
                    navigate('/');


                  }}><i className="fa fa-trash"></i></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile;