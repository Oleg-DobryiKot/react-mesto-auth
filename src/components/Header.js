import logo from '../images/logo/logo.svg';
import './styles/Header.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Header({ loggedIn, onLoggedOut, userData }) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Логотип"
      />
      <ul className="header__navbar">
        {loggedIn} 
        <li><Link to="/sign-in" className="header__login-link">Войти</Link></li> 
        {/* <li><Link to="/my-profile" className="header__my-profile">{userData.email}</Link></li> */}
        <li><button className="header__logout-link" onClick={ onLoggedOut } >Выйти</button></li>
      </ul>
    </header>  
  )
}

export default Header;