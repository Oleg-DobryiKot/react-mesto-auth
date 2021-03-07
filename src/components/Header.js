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
        <li className="header__navbar-links"><Link to="/my-profile" className="header__navbar-link">{userData.email}</Link></li>
        {loggedIn ? 
        <li className="header__navbar-links"><Link to="/" className="header__navbar-link" onClick={ onLoggedOut } >Выйти</Link></li> : 
        <li className="header__navbar-links"><Link to="/sign-in" className="header__navbar-link">Войти</Link></li>
         }
      </ul>
    </header>  
  )
}

export default Header;