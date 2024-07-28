// import { Outlet, Link } from "react-router-dom";
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import City from './City';
import Errorpage from './Errorpage';
import Login from './Login';
import Home from './Home';
import Navbar from './Navbar';
import Profile from './Profile';
import '../App.css'
import Postroom from './Postroom';
import Register from './Register';
import Logout from './Logout';
import ChangePassword from './ChangePassword';
import Userprofile from './Userprofile';
import RegisterLogin from './RegisterLogin';
const Layout = () => {
  return (
    <>
    <Router>
    <Navbar/>
    <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/City' element={<City/>}></Route>
          <Route exact path='/Profile' element={<Profile/>}></Route>
          <Route exact path='/Login' element={<RegisterLogin/>}></Route>
          {/* <Route exact path='/Register' element={<Register/>}></Route> */}
          <Route exact path='/Postroom' element={<Postroom/>}></Route>
          <Route exact path='/logout' element={<Logout/>}></Route>
          <Route exact path='/user/:id' element={<Userprofile/>}></Route>
          <Route exact path='/ChangePassword' element={ <ChangePassword/> }></Route>
          <Route exact path='*' element={<Errorpage/>}></Route>
   </Routes>
   </Router>
   </>
  )
};

export default Layout;