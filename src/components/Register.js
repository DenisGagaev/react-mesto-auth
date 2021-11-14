import React from "react";
import { Link } from 'react-router-dom';

export default function Register({ onRegister }) {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault()
    onRegister({ email, password })
  }

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h1 className="register__title">Регистрация</h1>
      <input autoComplete="on" className="register__email-input" placeholder="Email" id="email" name="email" type="email" value={email} onChange={handleChangeEmail} minLength="2" maxLength="40" required />
      <input autoComplete="on" className="register__password-input" placeholder="Пароль" id="password" name="password" type="password" value={password} onChange={handleChangePassword} minLength="2" maxLength="40" required />
      <button type="submit" className="register__button">Зарегистрироваться</button>
      <Link to="/sign-in" className="register__link">Уже зарегистрированы? Войти</Link>
    </form>
  )
}