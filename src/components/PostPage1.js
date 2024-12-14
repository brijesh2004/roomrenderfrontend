import React from 'react';


const PostPage1 = ({data ,setData}) => {
   
    const HandleChange=(e)=>{
       let name = e.target.name;
       let value = e.target.value;
      setData({ ...data, [name]: value });
    }
  return (
    <div className='post_room_page1'>
      <label htmlFor="roomrenterName">Name :</label><br />
      <input type="text" name='roomrenterName' placeholder='Enter the Name' onChange={HandleChange}/> <br />
      <label htmlFor="roomrenterName">Country :</label><br />
      <input type="text" name='country' placeholder='Enter Country Name' onChange={HandleChange}/><br />
      <label htmlFor="roomrenterName">State :</label><br />
      <input type="text" name='state' placeholder='Enter the State Name' onChange={HandleChange}/> <br />
      <label htmlFor="roomrenterName">City :</label><br />
      <input type="text" name='city' placeholder='Enter the City Name' onChange={HandleChange}/>
    </div>
  )
}

export default PostPage1
