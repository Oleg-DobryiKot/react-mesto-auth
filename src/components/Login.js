import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles/Login.css';

export default function Login({ onLogin }) {
 
  const initialData = {
    password: '',
    email: ''
  }
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
    
    onLogin(data)
      .then(resetForm)
      .then(() => history.push('/'))
      .catch(err => setMessage(err.message || 'Что-то пошло не так!'));
  }

    return(
      <div className="login">
        <p className="login__welcome">
          Вход
        </p>
        <form onSubmit={handleSubmit} className="login__form">
          <input className="login__input" placeholder="Email:" required id="email" name="email" type="text" value={data.email} onChange={handleChange} />
          <input className="login__input" placeholder="Пароль:" required id="password" name="password" type="password" value={data.password} onChange={handleChange} />
          <div className="login__button-container">
            <button type="submit" onSubmit={handleSubmit} className="login__button-submit">Войти</button>
          </div>
        </form>

        <div className="login__signup">
          <p>Ещё не зарегистрированы? 
          <Link to="/sign-up" className="login__signup-link">Регистрация</Link>
          </p>
        </div>
      </div>
    )
}

// Login;
