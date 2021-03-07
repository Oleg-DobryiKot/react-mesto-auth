import logoResolve from '../images/logo/logo-res.svg';
import logoReject from '../images/logo/logo-rej.svg';
import './styles/InfoTooltip.css';
import React from 'react';
import 'react-dom';

function InfoTooltip({isOpen, onClose, isRegistered, loginMessage}) {
  return (
    <section className={ `popup ${ isOpen ? 'popup_is-opened' : '' }` }>
      <div className="popup__container">
        <button onClick={ onClose } type="button" className="popup__close"></button>
        {isRegistered ? 
          <img
            className="popup__icon-resolve"
            src={logoResolve}
            alt="Успешный логин"
          /> :
          <img
            className="popup__icon-reject"
            src={logoReject}
            alt="Доступ закрыт"
          />
        }
        <h3 className="popup__title">{loginMessage}</h3> 
      </div>
    </section>
  )
}

export default InfoTooltip;