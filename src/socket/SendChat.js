import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import '../style/messagepage.css';


let socket;
let userID;

const SendChat = () => {
  const {id} = useParams();
  const [receiverId , setReceiverId] = useState(id);
  const [message, setMessage] = useState([]);
  const [inputmessage, setInputeMessage] = useState('');
  const [socketConnected , setSocketConnected] = useState(false);
  const [messageList , setMessageList] = useState([]);

  const fetchMessage = async () => {
    try{
      const res = await fetch(`${process.env.REACT_APP_PATH}/chat`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          receiverId
        })
      })
      if(res.status===200){
        const data =await res.json();
        setMessage(data.chat);
      }
      else{
        alert("Error");
      }
    }
    catch(error){
     alert("Error" , error);
    }
  }
  
  const AllMessageList = async ()=>{
    const res = await fetch(`${process.env.REACT_APP_PATH}/message` ,{
      method:'GET',
      credentials:'include',
      headers:{
        'Content-Type':'application/json'
      }
    })
    if(res.status===200){
      const data = await res.json();
      setMessageList(data.messages);
    }
    else{
      alert("Error");
    }
  }
  
  const sendMessage = async (e)=>{
    try{
      e.preventDefault();
      const res = await fetch(`${process.env.REACT_APP_PATH}/chat/send`,{
        method:'POST',
        credentials:'include',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          receiverId,message:inputmessage
        })
      })
      if(res.status===201){
        const data = await res.json();
        socket.emit("new message" , data);
        setMessage([...message ,{message:inputmessage ,sender:userID}]);
        setInputeMessage('');
      }else{
        alert("Error while sending message");
      }
    }
    catch(error){
      alert("Error while sending the message");
    }
  }

  const clickOnUser = (e)=>{
    const val = e.target.getAttribute("value");
    setReceiverId(val);
    setMessage([]);
    fetchMessage();
  }


  useEffect(()=>{
    const userId = localStorage.getItem('user');
    userID = userId;
    socket = io('http://localhost:7000')
    socket.emit("setup" , userId);
    socket.on("connected" ,() => setSocketConnected(true));
  })

  useEffect(()=>{
    AllMessageList();
    if(receiverId!==null){
      fetchMessage();
    }
  } , []);

  useEffect(()=>{
    socket.on("message received" , (data)=>{
      setMessage([...message , data]);
    })
  })
  return (
    <>
    <div className='message_list'>
    <div className='user_list'>

    <h1>User List</h1>
     {messageList.map((elem)=>(
      <div
      className='users_chat'
      style={{cursor:'pointer'}}
      key={elem._id}
      onClick={clickOnUser}
      value={elem.senderId===userID?elem.receiverId:elem.senderId}
      >{elem.senderId===userID?elem.receiverName:elem.senderName}</div>
     ))}
    </div>

    <div className='user_chat'>
    <h1>{receiverId?receiverId:'Double click on name to start'}</h1>
     <div>
      {message.map((elem, index) => (
        <div key={index}
        className={userID===elem.sender?'sender':'receiver'}
       >{elem.message} 
       </div>
      ))}
     </div>
    </div>
    </div>
     <div className='send_button'>
     <div>
      <input placeholder='start chat'  type="text" value={inputmessage} onChange={(e) => setInputeMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
     </div>
      </div>
      </>
  )
}

export default SendChat
