import React, { useState } from "react";
import logo from '../images/logo.svg';
import { Link, Route } from 'react-router-dom';

function Header({ email, onSignOut }) {
  const [isClicked, setIsClicked] = useState(false);

  function handleClickMenu() {
    setIsClicked(!isClicked)
  }

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />
      <Route path="/sign-in">
        <Link to='sign-up' className='header__link'>Регистрация</Link>
      </Route>
      <Route path="/sign-up">
        <Link to='sign-in' className='header__link'>Войти</Link>
      </Route>
      <Route exact path="/">
        <div className="header__user-menu">
          <p className='header__email'>{email}</p>
          <button
            onClick={() => {
              // не забыть ИСПРАВИТЬ!!
              //Вызов данной функции не несёт никакого смысла. Она просто меняет значение стейта isClicked, который нигде не используется. Вызов функции, саму функцию и стейт isClicked можно удалить
              onSignOut();
              handleClickMenu();
            }}
            className='header__link header__link_button'>Выйти</button>
        </div>
      </Route>
    </header>
  );
}

export default Header;