import React from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main(props) {
  const [userAvatar, setUserAvatar] = React.useState('#');
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
        setCards(initialCards);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="content">
      <section className="profile content__profile">
        <div className="profile__data">

          <div style={{ backgroundImage: `url(${userAvatar})` }} className="profile__avatar"></div>
          <button type="button" className="profile__avatar-batton" aria-label="Редактировать профиль"
            onClick={props.onEditAvatar}>
          </button>

          <div className="profile__info">
            <div className="profile__block">
              <h1 className="profile__name">{userName}</h1>
              <button type="button" className="profile__edit" aria-label="редактировать профиль"
                onClick={props.onEditProfile}>
              </button>
            </div>
            <p className="profile__text">{userDescription}</p>
          </div>

        </div>

        <button type="button" className="profile__addfoto-button" aria-label="добавить фото"
          onClick={props.onAddPlace}>
        </button>
      </section>

      <section className="elements content__elements">
        {cards.map((card) => (
          <Card
            card={card}
            onCardClick={props.onCardClick}
            likeCounter={card.likes.length}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
