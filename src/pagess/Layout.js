// import { Outlet, Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import City from './City';
import Errorpage from './Errorpage';
import Home from './Home';
import Navbar from './Navbar';
import Profile from './Profile';
import '../App.css'
import Logout from './Logout';
import ChangePassword from './ChangePassword';
import Userprofile from './Userprofile';
import RegisterLogin from './RegisterLogin';
import { useEffect, useState } from 'react';
import UploadRoom from './UploadRoom';
import RoomDetails from '../components/RoomDetails';
const Layout = () => {
  const [login, setLogin] = useState(false);
  const isLogin = async () => {
    try {
      const data = await fetch(`${process.env.REACT_APP_PATH}/users/about`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Origin': `${process.env.REACT_APP_PATH}`,
          "Content-Type": "application/json"
        },
      });
      if(data.status!==200){
        throw new Error("Login Error");
      }
      setLogin(true);
    }
    catch (err) {
      setLogin(false);
    }
  }
  useEffect(() => {
    isLogin();
  }, []);
  return (
    <>
      <Router>
        <Navbar login={login} setLogin={setLogin} />
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/City' element={<City />}></Route>
          <Route exact path='/Profile' element={<Profile login={login} />}></Route>
          <Route exact path='/Login' element={<RegisterLogin login={login} setLogin={setLogin}/>}></Route>
          <Route exact path='/logout' element={<Logout setLogin={setLogin}/>}></Route>
          <Route exact path='/user/:id' element={<Userprofile />}></Route>
          <Route exact path='/room/:id' element={<RoomDetails/>}></Route>
          <Route exact path='/ChangePassword' element={<ChangePassword />}></Route>
          <Route exact path='/uploadroom' element={<UploadRoom login={login}/>}></Route>
          <Route exact path='*' element={<Errorpage />}></Route>
        </Routes>
      </Router>
    </>
  )
};

export default Layout;