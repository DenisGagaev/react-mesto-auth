import React from "react";
import Card from "./Card";
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardDelete, onCardLike, cards }) {

  const { name, about, avatar } = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile content__profile">
        <div className="profile__data">

          <div style={{ backgroundImage: `url(${avatar})` }} className="profile__avatar"></div>
          <button type="button" className="profile__avatar-batton" aria-label="Загрузить новый аватар"
            onClick={onEditAvatar}>
          </button>

          <div className="profile__info">
            <div className="profile__block">
              <h1 className="profile__name">{name}</h1>
              <button type="button" className="profile__edit" aria-label="редактировать профиль"
                onClick={onEditProfile}>
              </button>
            </div>
            <p className="profile__text">{about}</p>
          </div>

        </div>

        <button type="button" className="profile__addfoto-button" aria-label="добавить фото"
          onClick={onAddPlace}>
        </button>
      </section>

      <section className="elements content__elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardDelete={onCardDelete}
            likeCounter={card.likes.length}
            onCardLike={onCardLike}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
