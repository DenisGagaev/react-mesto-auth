import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import api from "../utils/api";
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from "./Login";
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';
import ConfirmDeletePopup from "./ConfirmDeletePopup";

function App() {
  const history = useHistory();

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [isCardDelete, setIsCardDelete] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipShow, setInfoTooltipShow] = useState({ isOpen: false, successful: false });
  const [profileEmail, setProfileEmail] = useState('')

  const [currentUser, setCurrentUser] = useState({});
  const [isDataLoad, setIsDataLoad] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ isOpen: false, element: {} });
  const [selectedCardDelete, setSelectedCardDelete] = useState({ element: {} });
  //Получение данных профиля и карточек 
  
  useEffect(() => {
    if (loggedIn) {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
      setCurrentUser(userData);
      setCards(initialCards);
    })
      .catch(err => { console.log(err); });
  }
  }, [loggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then(data => {
          if (data) {
            setProfileEmail(data.data.email)
            setLoggedIn(true)
            history.push('/');
          }
        })
        .catch(err => { console.log(err); })
    }
  }, [history]);

  function handleDeleteButtonClick(card) {
    setIsCardDelete(!isCardDelete);
    setSelectedCardDelete(card);
  }

  function handleInfoTooltip(res) {
    setInfoTooltipShow({ ...isInfoTooltipShow, isOpen: true, successful: res });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
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
    setIsCardDelete(false);
    setSelectedCard({ ...selectedCard, isOpen: false });
    setIsDataLoad(false);
    setInfoTooltipShow({ isOpen: false, successful: false });
    setSelectedCardDelete({});
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

  function handleCardDelete(card) {
    setIsDataLoad(true);
    api.deleteCard(card._id).then(() => {
      const newCards = cards.filter(newCard => newCard._id !== card._id)
      //* Обновляем стейт
      setCards(newCards);
      closeAllPopups()
    })
      .catch(err => {
        console.log(err);
      })
      .finally(() => { setIsDataLoad(false) });
  }


  function handleLogin({ email, password }) {
    auth.login(email, password)
      .then(res => {
        if (res.token) {
          setProfileEmail(email)
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          history.push('/')
        }
      })
      .catch(err => {
        handleInfoTooltip(false);
        console.log(err)
      })
  }

  function handleRegister({ email, password }) {
    auth.register(email, password)
      .then(data => {
        if (data) {
          handleInfoTooltip(true);
          history.push('/sign-in');
        }
      })
      .catch(err => {
        handleInfoTooltip(false);
        console.log(err);
      })
  }

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setProfileEmail('')
    setLoggedIn(false);
    history.push('/sign-in');
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={profileEmail} onSignOut={handleSignOut} />
        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardDelete={handleDeleteButtonClick}
            onCardLike={handleCardLike}
            cards={cards}
          />

          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>

          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
          <Footer />
        </Switch>

        <InfoTooltip onClose={closeAllPopups} status={isInfoTooltipShow} />
        <EditProfilePopup isDataLoad={isDataLoad} onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <EditAvatarPopup isDataLoad={isDataLoad} onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup isDataLoad={isDataLoad} onAddCard={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <ConfirmDeletePopup card={selectedCardDelete} isDataLoad={isDataLoad} onDeleteCard={handleCardDelete} isOpen={isCardDelete} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;