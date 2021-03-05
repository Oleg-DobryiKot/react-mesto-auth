import logo from '../images/logo/logo.svg';
import './Header.css';

function Header(props) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Логотип"
      />
    </header>  
  )
}

export default Header;