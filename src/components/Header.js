import React from "react";
import logo from '../images/logo.svg';

function Header({loggedIn}) {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />
      <a href={loggedIn ? 'Регистрация' : 'Войти'}>{loggedIn ? 'Регистрация' : 'Войти'}</a>
    </header>
  );
}

export default Header;
