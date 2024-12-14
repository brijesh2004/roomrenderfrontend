import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import RoomItem from "../components/RoomItem";

const Profile = ({ login }) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [Loading, setLoading] = useState(false);

  const [userroom, setUserroom] = useState([]);

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
      setLoading(false);
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
          <RoomItem searchedData={userroom} Loading={Loading} isAdmin={true}/>
        </div>
      </div>
    </>
  )
}

export default Profile;