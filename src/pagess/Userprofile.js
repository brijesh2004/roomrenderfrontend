import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';

const Userprofile = () => {
    const {id} = useParams();
    const [name , setName] = useState("");
    const [rooms , setRooms] = useState([]);
    const [loading , setLoading] = useState(true);
    const fetchUser = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_PATH}/user/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': process.env.REACT_APP_PATH // Assuming you need to set Origin here; usually, it's not required
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const userData = await response.json();
            console.log(userData.mess.rooms);
            setName(userData.mess.name);
            setRooms(userData.mess.rooms);
            setLoading(false)
        } catch (err) {
            setLoading(false);
            alert(`Error fetching user: ${err.message}`);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [id]); // Include id as a dependency for re-fetching if the id changes

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
                    {/* <p><span className="room_details">Location</span>  - {document.location}</p> */}
                    <p><span className="room_details">Uploaded Date</span>  - {document.date.slice(0,10).split('-').reverse().join('-')}</p>
                    <a
                      href={`${document.location}`}
                    >
                      Go To Map
                    </a> <br />
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
