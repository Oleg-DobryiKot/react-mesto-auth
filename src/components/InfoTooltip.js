import logoResolve from '../images/logo/logo-res.svg';
import logoReject from '../images/logo/logo-rej.svg';
import './styles/InfoTooltip.css';
import React, { useContext } from 'react';
import 'react-dom';
import { ErrorMessageContext } from '../contexts/ErrorMessageContext';

function InfoTooltip({isOpen, onClose, isRegistered}) {
  const { message } = useContext(ErrorMessageContext);

  const TooltipMessage = isRegistered ? 'Вы успешно зарегестрировались!' : (message || 'Что-то пошло не так!');
  const TooltipLogo = isRegistered ? logoResolve : logoReject;

  return (
    <section className={ `popup ${ isOpen ? 'popup_is-opened' : '' }` }>
      <div className="tooltip__container">
        <button onClick={ onClose } type="button" className="popup__close"></button>
          <img
            className="tooltip__icon"
            src={TooltipLogo}
            alt="Успешный логин"
          /> 
        <h3 className="tooltip__title">{ TooltipMessage }</h3> 
      </div>
    </section>
  )
}

export default InfoTooltip;