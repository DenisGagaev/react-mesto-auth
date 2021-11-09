import React from "react";
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header({ loggedIn }) {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />
      <Link className="header__link" to={loggedIn ? '/sign-in' : '/sign-up'}>{loggedIn ? 'Войти' : 'Регистрация'}</Link>
    </header>
  );
}

export default Header;