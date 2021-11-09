import React from "react";

function Login() {
  return (
    <form className="login">
      <h1 className="login__title">Вход</h1>
      <input className="login__email-input" placeholder="Email" />
      <input className="login__password-input" placeholder="Пароль" />
      <button className="login__button">Войти</button>
    </form>
  )
}

export default Login;