import logo from '../images/logo/logo.svg';
import './styles/Header.css';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ loggedIn, onLoggedOut, userData }) {
  const location = useLocation();
  const [navbar, setNavbar] = useState({routePath: "/sign-in", routeName: 'Войти'}) 

  useEffect(() => {
    (location.pathname === "/sign-up") ? setNavbar({routePath: "/sign-in", routeName: 'Войти'}) : setNavbar({routePath: "/sign-up", routeName: 'Регистрация'})  
   }, [location]);

  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Логотип"
      />
      <ul className="header__navbar">
        <li className="header__navbar-links"><Link to="/my-profile" className="header__navbar-link">{userData.email}</Link></li>
        {userData.email === '' && 
        <li className="header__navbar-links"><Link to={navbar.routePath} className="header__navbar-link">{navbar.routeName}</Link></li>}
        {loggedIn && <li className="header__navbar-links"><Link to="/" className="header__navbar-link" onClick={ onLoggedOut } >Выйти</Link></li>}
      </ul>
    </header>  
  )
}

export default Header;