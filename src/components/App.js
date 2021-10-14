import React from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({isOpen: false, element: {}});

  function handleCardClick(card) {
    setSelectedCard({ ...selectedCard, isOpen: true, element: card });
  }

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
    setSelectedCard({...selectedCard, isOpen: false})
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
        name="popup__form"
        idForm="popup__form-profile"
        id="popup__Profile"
        title="Редактировать профиль"
        saveName="Сохранить"
      >
        <label className="popup__form-field">
          <input
            className="popup__input" type="text" required minLength="2" maxLength="40" id="popup__name-input"
            name="name" placeholder="Ваше имя" />
        </label>
        <label className="popup__form-field">
          <input
            className="popup__input" type="text" required minLength="2" maxLength="200" id="popup__text-input"
            name="about" placeholder="О Вас" />
        </label>
      </PopupWithForm>

      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
        id="popup__card"
        idForm="popup__form-photo"
        name="popup__form"
        title="Новое место"
        saveName="Создать"
      >
        <label className="popup__form-field">
          <input name="photoText" className="popup__input" id="popup__photoText-input" required minLength="2"
            maxLength="30" placeholder="Название карточки" type="text" />
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
        saveName="Сохранить"
      >
        <label className="popup__form-field">
          <input name="avatarLink" className="popup__input" id="popup__avatarLink-input" required
            placeholder="Ссылка на картинку" type="url" />
        </label>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

    </div>
  );
}

export default App;
