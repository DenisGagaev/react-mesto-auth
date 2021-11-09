import React from "react";
import logo from '../images/logo.svg';

function Header({isHaveAccount}) {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />
      <a href={isHaveAccount ? 'Регистрация' : 'Войти'}>{isHaveAccount ? 'Регистрация' : 'Войти'}</a>
    </header>
  );
}

export default Header;
