import React from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import api from "../utils/api";
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from "./Login";
import Register from './Register';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false, element: {} });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isCardDelete, setIsCardDelete] = React.useState(false);
  const [isDataLoad, setIsDataLoad] = React.useState(false);

  let isHaveAccount = false;

  React.useEffect(() => {
    api.getUserInfo()
      .then(res => { setCurrentUser(res); })
      .catch(err => { console.log(err); })
  }, []);

  React.useEffect(() => {
    api.getInitialCards()
      .then(initialCards => {
        setCards(initialCards);
      })
      .catch(err => { console.log(err) });
  }, []);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      const newCards = cards.filter(newCard => newCard._id !== card._id)
      //* Обновляем стейт
      setCards(newCards);
    })
      .catch(err => {
        console.log(err);
      });
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard({ ...selectedCard, isOpen: true, element: card });
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsCardDelete(false)
    setSelectedCard({ ...selectedCard, isOpen: false });
    setIsDataLoad(false)
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLike(card._id, isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
      .catch(err => {
        console.log(err);
      });
  }

  function handleUpdateUser(newUserData) {
    setIsDataLoad(true);
    api.editProfile(newUserData)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch(err => { console.log(err) })
      .finally(() => { setIsDataLoad(false) });
  }

  function handleUpdateAvatar(newAvatar) {
    setIsDataLoad(true);
    api.editAvatar(newAvatar)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch(err => { console.log(err) })
      .finally(() => { setIsDataLoad(false) });
  }

  function handleAddPlaceSubmit(newCard) {
    setIsDataLoad(true);
    api.sendCard(newCard).then((res) => {
      setCards([res, ...cards]);
      closeAllPopups()
    })
      .catch(err => {
        console.log(err);
      })
      .finally(() => { setIsDataLoad(false) });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header isHaveAccount={isHaveAccount} />
        {isHaveAccount ? <Login /> : <Register />}
        {/* <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
          cards={cards}
        /> */}
        <Footer />
        <InfoTooltip isDataLoad={isDataLoad} onClose={closeAllPopups} />
        <EditProfilePopup isDataLoad={isDataLoad} onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <EditAvatarPopup isDataLoad={isDataLoad} onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup isDataLoad={isDataLoad} onAddCard={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <PopupWithForm
          onClose={closeAllPopups}
          isOpen={isCardDelete}
          name="popup__form"
          id="popap__deleteCard"
          title="Вы уверены?"
          saveName="Да">
        </PopupWithForm>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
