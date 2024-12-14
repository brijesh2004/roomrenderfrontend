import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Loading from '../pagess/Loading';
import { useNavigate } from 'react-router-dom';
import SimilarRooms from './SimilarRooms';

const RoomDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [room, setRoom] = useState();

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

    const fetchData = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_PATH}/room?id=${id}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    'Origin': `${process.env.REACT_APP_PATH}`,
                    "Content-Type": "application/json",
                },
            })
            const data = await res.json();
            setRoom(data.data);
        }
        catch (err) {
            alert("Something went wrong");
        }

    }

    useEffect(() => {
        fetchData();
    }, [id]);
    return (
        <>
            {room !== undefined ?
                <div className='room_details_with_id'>
                    <div>
                        <Carousel className='room_carousel' infiniteLoop={true} showIndicators={false} showThumbs={false}>
                            {Array.isArray(room.images) &&
                                room.images.map((elem, index) => (
                                    <div key={index}>
                                        <img src={elem} alt="image" height={400} />
                                    </div>
                                ))
                            }
                        </Carousel>
                    </div>
                    <div className='after_carousel'>
                     <div>Name : {room.roomrenterName}</div>
                     <div>Country : {room.country}</div>
                     <div>State : {room.state}</div>
                     <div>City : {room.city}</div>
                     <div>Mobile : {room.mobile}</div>
                     <div>Price : {room.price} ₹</div>
                     <div>{room.roomdetails}</div>
                     <div>{formatDate(room.CreatedAt)}</div>
                     <br />
                     <button className="visit_profile_btn" onClick={() => navigate(`/user/${room.userId}`)}>
                      Visit Profile
                    </button>
                    </div>
                </div>:
                <Loading />}
    {room!==undefined?
     <SimilarRooms city={room.city}/>:null
    }
            

                
        </>
    )
}

export default RoomDetails
