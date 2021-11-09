// import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import { Link } from 'react-router-dom';
// import * as auth from '../utils/auth';

export default function Register({ onRegister }) {
  const initialData = {
    email: '',
    password: '',
  }

  const [profileData, setProfileData] = useState(initialData);
  // const [message, setMessage] = useState('');
  // const history = useHistory();

  // useEffect(() => {
  //   if (localStorage.getItem('jwt')) {
  //     history.push('/');
  //   }
  // }, [history])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfileData(profileData => ({
      ...profileData,
      [name]: value
    }));
  };

  // const resertFrom = () => {
  //   setProfileData(initialData);
  //   setMessage('');
  // }

  const handleSubmit = (e) => {
    e.preventDefault()
    onRegister(profileData)
  }

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h1 className="register__title">Регистрация</h1>
      <input className="register__email-input" placeholder="Email" id="email" name="email" type="email" value={profileData.email} onChange={handleChange} minLength="2" maxLength="40" required />
      <input className="register__password-input" placeholder="Пароль" id="password" name="password" type="password" value={profileData.password} onChange={handleChange} minLength="2" maxLength="40" required />
      <button type="submit" className="register__button">Зарегистрироваться</button>
      <Link to="/sign-in" className="register__link">Уже зарегистрированы? Войти</Link>
    </form>
  )
}
