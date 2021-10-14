import React from "react";
import Header from './header';
import Main from './main';
import Footer from './footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from './ImagePopup';



function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
      />
      <Footer />

      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
        name="popup__form"
        idForm="popup__form-profile"
        id="popup__Profile"
        title="Редактировать профиль"
      >
        <label className="popup__form-field">
          <input
            className="popup__input" type="text" required minlength="2" maxlength="40" id="popup__name-input"
            value="" name="name" placeholder="Ваше имя" />
        </label>
        <label className="popup__form-field">
          <input
            className="popup__input" type="text" required minlength="2" maxlength="200" id="popup__text-input"
            value="" name="about" placeholder="О Вас" />
        </label>
      </PopupWithForm>

      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
        id="popup__card"
        idForm="popup__form-photo"
        name="popup__form"
        title="Новое место"
      >
        <label className="popup__form-field">
          <input name="photoText" className="popup__input" id="popup__photoText-input" required minlength="2"
            maxlength="30" placeholder="Название карточки" type="text" />
        </label>
        <label className="popup__form-field">
          <input name="photoLink" className="popup__input" id="popup__photoLink-input" required
            placeholder="Ссылка на картинку" type="url" />
        </label>
      </PopupWithForm>

      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen}
        id="popap__avatar"
        idForm="popup__form-avatar"
        name="popup__form"
        title="Обновить аватар"
      >
        <label className="popup__form-field">
          <input name="avatarLink" className="popup__input" id="popup__avatarLink-input" required
            placeholder="Ссылка на картинку" type="url" />
        </label>
      </PopupWithForm>

      <div className="popup" id="popap__deleteCard">
        <div className="popup__container">
          <button type="button" aria-label="закрыть попап" className="popup__close" id="popupDeleteClose"></button>
          <h2 className="popup__header popup__header_margin">Вы уверены?</h2>
          <form className="popup__form" name="popup__form" id="popup__form-delete" novalidate>
            <fieldset className="popup__set">
              <button type="submit" className="popup__button">Да</button>
            </fieldset>
          </form>
        </div>
        <div className="popup__overlay" id="popup__overlay-deleteCard"></div>
      </div>

      <ImagePopup />

      <template id="cardTemplate">
        <article className="element">
          <img className="element__image" src="#" alt="Ваши-Фото" />
        </article>
      </template>
    </div>
  );
}

export default App;
