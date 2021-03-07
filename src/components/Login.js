import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import './styles/Login.css';

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
          <label htmlFor="email">
            E-mail:
          </label>
          <input required id="email" name="email" type="text" value={data.email} onChange={handleChange} />
          <label htmlFor="password">
            Пароль:
          </label>
          <input required id="password" name="password" type="password" value={data.password} onChange={handleChange} />
          <div className="login__button-container">
            <button type="submit" onSubmit={handleSubmit} className="login__link">Войти</button>
          </div>
        </form>

        <div className="login__signup">
          <p>Ещё не зарегистрированы?</p>
          <Link to="/sign-up" className="signup__link">Зарегистрироваться</Link>
        </div>
      </div>
    )
}

// Login;
