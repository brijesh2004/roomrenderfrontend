import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [login , setLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

 let email = "";
  useEffect(() => {
    email =  localStorage.getItem('email')
    if(email)
     setLogin(true)
    else
     setLogin(false)
  },[]);


  const Nav = ()=>{
    return(
      <>
       <nav className='nav_bar'>
            <div className='navbar-logo'>RentKart</div>
            <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
                    <Link to='/'>Home</Link>
                    <Link to='City'>Cities</Link>
                    {login&&<Link to="/Postroom">Post</Link>}
                    {!login&&<Link to='/Login'><button className="get_started">Get Started</button></Link>}
                    {login&& <Link to='/profile'>Profile</Link>}
                    {login&& <Link to='/logout'><button className="get_logout">Logout</button></Link>}
            </div>
         <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
     </nav>
        <div className={`main-content ${isOpen ? 'pushed' : ''}`}>
      </div>
     </>
    )
  }

  return (
    <>
      <Nav/>
    </>
  );
};

export default Navbar;

