import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';

const Userprofile = () => {
    const {id} =  useParams();
    const [name , setName] = useState("");
    const [rooms , setRooms] = useState([]);
    const [loading , setLoading] = useState(true);

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

        

        const fetchUser = useCallback(async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.REACT_APP_PATH}/user/${id}`, {
                    method: 'GET',
                    credentials:"include",
                    headers: {
                        'Content-Type': 'application/json',
                        'Origin': process.env.REACT_APP_PATH
                    }
                });
                const userData = await response.json();
                setName(userData.mess.name);
                setRooms(userData.rooms);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                alert(`Error fetching user: ${err.message}`);
            }
        }, [id]);
    
        useEffect(() => {
            fetchUser();
        }, [fetchUser]);

    return (
        <>
           <center>{loading&&<Loading/>}</center> 
       <center>{!loading&& <h1>Name - {name}</h1>}</center> 
           {
            !loading&&<div style={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
                {!loading&&
                    rooms.map((document , ind)=>
                         (
                     <div key={ind} className="search_result_box">
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
                    {/* <p><span className="room_details">Location</span>  - {document.location}</p> */}
                    
                            </div>
                        )
                    )
                }
            </div>
           }
        </>
    );
}

export default Userprofile;
