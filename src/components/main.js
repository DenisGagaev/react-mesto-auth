import React from "react";
import api from "../utils/Api";


function Main(props) {
  return (
    <main className="content">
      <section className="profile content__profile">
        <div className="profile__data">
          <div className="profile__avatar"></div>
          <button type="button" className="profile__avatar-batton" aria-label="Редактировать профиль"
            onClick={props.onEditAvatar}>
          </button>
          <div className="profile__info">
            <div className="profile__block">
              <h1 className="profile__name">Загрузка...</h1>
              <button type="button" className="profile__edit" aria-label="редактировать профиль"
                onClick={props.onEditProfile}>
              </button>
            </div>
            <p className="profile__text">Подождите=)</p>
          </div>
        </div>
        <button type="button" className="profile__addfoto-button" aria-label="добавить фото"
          onClick={props.onAddPlace}>
        </button>
      </section>
      <section className="elements content__elements">
      </section>
    </main>
  );
}

export default Main;