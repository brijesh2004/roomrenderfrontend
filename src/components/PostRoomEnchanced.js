import React, { useEffect, useState } from 'react';
import PostPage1 from './PostPage1';
import PostPage2 from './PostPage2';
import PostPage3 from './PostPage3';
import { useNavigate } from 'react-router-dom';
import '../style/postroom.css';

const PostRoomEnchanced = ({login}) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState('');
  const [data, setData] = useState({
    roomrenterName: '',
    country: '',
    state: '',
    city: '',
    mobile: '',
    place: '',
    roomdetails: '',
    price: ''
  });

  const [files, setFile] = useState(null);

  const handleUpload = async (id) => {
    if (files.length > 5) {
      alert("more than 5 images are not allowed");
    }

    const formData = new FormData();
    for (const file of files) {
      formData.append("images", file); // Key must match backend field name
    }
    try {
      setMessage("Uploading the Images...");
      const response = await fetch(`${process.env.REACT_APP_PATH}/uploadImages?id=${id}`, {
        method: "POST",
        credentials: "include",
        headers: {
        },
        body: formData,
      });
      await response.json();
      setMessage("");
      alert("Uploaded!");
      navigate("/");

    } catch (error) {
      alert("Error uploading the files");
      setMessage("");
      console.error("Error uploading files:", error);
    }
  };




  const HandleSubmit = async (e) => {
    e.preventDefault();
    const { roomrenterName, country, state, city, mobile, place, roomdetails, price } = data;
    if (!roomrenterName || !country || !state || !city || !mobile || !place || !roomdetails || !price) {
      alert("Please select All Files");
      return;
    }
    if (files.length > 5) {
      alert("more than 5 images are not allowed");
      return;
    }
    try {
      setMessage("Uploading the room details ...");
      const res = await fetch(`${process.env.REACT_APP_PATH}/roomupload`, {
        method: 'POST',
        credentials: "include",
        headers: {
          'Origin': `${process.env.REACT_APP_PATH}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          roomrenterName, country, state, city, mobile, place, roomdetails, price
        })
      })
      const data = await res.json();
      if (res.status === 201) {
        setMessage("Now Uploading the Images");
        handleUpload(data.id);
      }
      else {
        setMessage("Error while uploading the data");
      }
    }
    catch (error) {
      alert("Error while uploading the data");
    }
  }


useEffect(()=>{
    if(!login){
      navigate("/login");
    }
  } , [login]);

  const renderItem = () => {
    switch (page) {
      case 1:
        return (
          <>
            <PostPage1 data={data} setData={setData} />
          </>
        )
      case 2:
        return (
          <>
            <PostPage2 data={data} setData={setData} />
          </>
        )
      case 3:
        return (
          <>
            <PostPage3 files={files} setFile={setFile} />
          </>
        )
      default:
        return <>
          <h1>Null</h1>
        </>
    }
  }

  return (
    <div>
      {message}
      <div className='postroom_main_div'>
      <h1>Upload Room</h1>
       {renderItem()}
      
      <div className='next_prev_button'>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
        {page!==3?
        <button onClick={() => setPage(page + 1)} disabled={page === 3}>Next</button>
        :
        <button disabled={files === null} onClick={HandleSubmit}>Submit</button>
        }
      </div>
</div>
    </div>
  )
}

export default PostRoomEnchanced;
