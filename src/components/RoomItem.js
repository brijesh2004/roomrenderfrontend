import React from 'react'
import { useNavigate } from 'react-router-dom';
import Spinner from '../pagess/Loading';

const RoomItem = ({searchedData ,Loading , isAdmin}) => {
    const navigate = useNavigate();
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

     const HandleClick = (e)=>{
       const val = e.target.closest('.search_result');
       const key = val.getAttribute('data-key');
       navigate(`/room/${key}`);
      }
    const deleteRoom = async (e , id)=>{
        e.stopPropagation();
         try{
            const res = await fetch(`${process.env.REACT_APP_PATH}/delete/myModel/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                  'Origin': `${process.env.REACT_APP_PATH}`,
                  "Content-Type": "application/json"
                }
              })
              const data = await res.json();
              if (data.status === 404 || data.status === 500||data.status===401) {
                alert("Error");
              }
    
              alert("Room data Delete Successfully");
             
              navigate('/');
        }
        catch(error){
            alert("Error while deleting the Room");
        }
    }

    return (
        <div className="user_search_list">
            {Loading && <Spinner />}
            <div className="search_details_list" onClick={HandleClick}>
                {!Loading && searchedData.map((room) => (
                    <div key={room._id} className="search_result" data-key={room._id}>
                        <img src={room.images[0]} alt="images" />
                        <p><span className="span_elem">Price:</span>{room.price} ₹</p>
                        <p><span className="span_elem">City: </span>{room.city}</p>
                        <p><span className="span_elem">Place: </span>{room.place}</p>
                        <p>{room.roomdetails.slice(0, 40)}...</p>
                        <p>{formatDate(room.CreatedAt)}</p>
                        {isAdmin?
                        <div className='admin_button'>
                          <button disabled={true}>Edit</button>
                          <button onClick={(e)=>deleteRoom(e ,room._id)}>Delete</button>
                        </div>:null
                        }
                    </div>
                ))}
                {searchedData.length === 0 && <div>
                    <center> {!Loading && <h1>No Data </h1>}</center>
                </div>}
            </div>
        </div>


    )
}

export default RoomItem
