import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import './styles/Register.css';

export default function Register({ onRegister }) {
  const initialData = {
    password: '',
    email: ''
  };

  const [data, setData] = useState(initialData);
  const [message, setMessage] = useState('');
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
    setMessage('');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
      
    if (!data.email || !data.password) {
        return;
      }

    onRegister(data)
      .then(resetForm)
      .then(() => history.push('/sign-in'))
      .catch(err => setMessage(err.message || 'Что-то пошло не так!'));
  }
  
  return (
    <div className="register">
      <p className="register__welcome">
        Регистрация
      </p>
      <form onSubmit={handleSubmit} className="register__form">
        <label htmlFor="email">
          Email:
        </label>
        <input id="email" name="email" type="email" value={data.email} onChange={handleChange} />
        <label htmlFor="password">
          Пароль:
        </label>
        <input id="password" name="password" type="password" value={data.password} onChange={handleChange} />
        <div className="register__button-container">
            <button type="submit" onSubmit={handleSubmit} className="register__link">Зарегистрироваться</button>
        </div>
      </form>

      <div className="register__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__login-link">Войти</Link>
      </div>
    </div>
  );

}

// Register;