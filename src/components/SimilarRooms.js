import React, { useEffect, useState } from 'react'
import RoomItem from './RoomItem';

const SimilarRooms = ({city}) => {
    const [similarRooms, setSimilarRooms] = useState([]);
    const [loading , setLoading] = useState(false);
    const fetchSimilarRoom = async () => {
        try{
            setLoading(true);
            const res = await fetch(`${process.env.REACT_APP_PATH}/rooms/similarrooms?city=${city}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    'Origin': `${process.env.REACT_APP_PATH}`,
                    "Content-Type": "application/json",
                },
            })
    
            const data = await res.json();
            if(res.status!==200){
                throw new Error("Error");
            }
            setSimilarRooms(data.data);
            setLoading(false);
        }
        catch(err){
        alert("Error while fetching the similar rooms");
        setLoading(false);
        }
    }

    useEffect(()=>{
        fetchSimilarRoom();
    } , [city]);
    return (
        <div>
         <h1>Similar Rooms</h1>
         <RoomItem searchedData={similarRooms} Loading={loading} isAdmin={false}/>
        </div>
    )
}

export default SimilarRooms
