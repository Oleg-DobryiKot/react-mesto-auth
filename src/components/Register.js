import React, { useState, useEffect, useContext } from 'react';
import { ErrorMessageContext } from '../contexts/ErrorMessageContext';
import { Link, useHistory } from 'react-router-dom';
import './styles/Register.css';

export default function Register({ onRegister, onShowTooltip }) {
  const initialData = {
    password: '',
    email: ''
  };

  const [data, setData] = useState(initialData);
  const { setErrorMessage } = useContext(ErrorMessageContext);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      history.push('/');
    }
  },[history])

  const handleChange = (event) => {
    const {name, value} = event.target;
    setData(data => ({
      ...data,
      [name]: value,
    }));
  }

  const resetForm = () => {
    setData(initialData);
    setErrorMessage('');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
      
    if (!data.email || !data.password) {
        onShowTooltip();
        return;
      }

    onRegister(data)
      .then(onShowTooltip())
      .then(resetForm)
      .then(() => history.push('/sign-in'))
      .catch(err => setErrorMessage(err.message || 'Что-то пошло не так!'));
  }
  
  return (
    <div className="register">
      <p className="register__welcome">
        Регистрация
      </p>

      <form onSubmit={handleSubmit} className="register__form">
        <input className="register__input" id="email" name="email" type="email" placeholder="Email:" value={data.email} onChange={handleChange} />
        <input className="register__input" id="password" name="password" type="password" placeholder="Пароль:" value={data.password} onChange={handleChange} />
        <div className="register__button-container">
            <button type="submit" onSubmit={handleSubmit} className="register__button-submit">Зарегистрироваться</button>
        </div>
      </form>

      <div className="register__signin">
        <p>Уже зарегистрированы? 
          <Link to="/sign-in" className="register__link">Войти</Link>
        </p>
      </div>
    </div>
  );

}