import React from "react";

function Register() {
  return (
    <form className="register">
      <h1 className="register__title">Регистрация</h1>
      <input className="register__email-input" placeholder="Email" />
      <input className="register__password-input" placeholder="Пароль" />
      <button className="register__button">Зарегистрироваться</button>
      <a className="register__link">Уже зарегистрированы? Войти</a>
    </form>
  )
}

export default Register;