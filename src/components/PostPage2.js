import React from 'react'

const PostPage2 = ({ data, setData }) => {
  const HandleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({ ...data, [name]: value });
  }
  return (
    <div className='post_room_page1'>
      <label htmlFor="roomrenterName">Mobile Number :</label><br />
      <input type="number" name='mobile' placeholder='Enter Mobile Number' onChange={HandleChange} /> <br />
      <label htmlFor="roomrenterName">Area :</label><br />
      <input type="text" name='place' placeholder='Enter the Area' onChange={HandleChange} /><br />
      <label htmlFor="roomrenterName">Room Details and nearest famous things :</label><br />
      <textarea className='text_area' name="roomdetails" placeholder='Enter the room details' onChange={HandleChange} rows="5">
      </textarea> <br />
      <label htmlFor="roomrenterName">Price :</label><br />
      <input type="number" name='price' placeholder='Enter Price in Rs' onChange={HandleChange} /><br />
    </div>
  )
}

export default PostPage2
