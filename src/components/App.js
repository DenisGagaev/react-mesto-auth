import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
//import PopupWithForm from "./PopupWithForm";
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

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ isOpen: false, element: {} });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isCardDelete, setIsCardDelete] = useState(false);
  const [isDataLoad, setIsDataLoad] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [isRegisterStatusSuccess, setIsRegisterStatusSuccess] = useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = useState(false);

  const initialData = {
    email: '',
    password: '',
  }

  const [profileData, setProfileData] = useState(initialData);

  useEffect(() => {
    api.getUserInfo()
      .then(res => { setCurrentUser(res); })
      .catch(err => { console.log(err); })
  }, []);

  useEffect(() => {
    api.getInitialCards()
      .then(initialCards => {
        setCards(initialCards);
      })
      .catch(err => { console.log(err) });
  }, []);

  function handleRegisterStatus() {
    setIsRegisterStatusSuccess(!isRegisterStatusSuccess);
  }

  function handleRegisterPopupShow() {
    setRegisterPopupOpen(!isRegisterPopupOpen);
  }

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

  const history = useNavigate();

  // const tokenCheck = () => {
  //   const jwt = localStorage.getItem('jwt');

  //   if (jwt) {
  //     auth.checkToken(jwt)
  //       .then((res) => {
  //         if (res) {
  //           setProfileData({
  //             email: res.email,
  //             password: res.password
  //           })
  //           setLoggedIn(true)
  //         }
  //       })
  //       .catch(() => history.push('/sign-in'));
  //   }
  // };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then(data => {
          if (data) {
            // setEmail(data.data.email);
            setLoggedIn(true)
            // history.push('/');
          }
        })
    }
  }, [history]);

  function handleLogin({ email, password }) {
    auth.login(email, password)
      .then(res => {
        // if (!res || res.statusCode === 400) throw new Error('Что-то пошло не так');
        if (res.token) {
          setLoggedIn(true);
          // setProfileData({
          //   email: res.user.email,
          //   password: res.user.password
          // })
          localStorage.setItem('jwt', res.token);
          history.push('/')
        }
      })
  }

  function handleRegister({ email, password }) {
    auth.register(email, password)
      .then(data => {
        if (data) {
          handleRegisterStatus(true)
          handleRegisterPopupShow(true);
          history.push('/sign-in');
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setProfileData(initialData);
    setLoggedIn(false);
    history.push('/sign-in');
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} onSignOut={handleSignOut} />
        <Routes>
          <Route path="/cards" element={
            <ProtectedRoute
              loggedIn={loggedIn}
              element={
                <Footer />
              }>
                <Footer />
              {/* <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardDelete={handleCardDelete}
                  onCardLike={handleCardLike}
                  cards={cards}
                />
                <Footer />

                <EditProfilePopup isDataLoad={isDataLoad} onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
                <EditAvatarPopup isDataLoad={isDataLoad} onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
                <AddPlacePopup isDataLoad={isDataLoad} onAddCard={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} /> */}
            </ProtectedRoute>
          } />

          <Route path="/sign-up" element={
            <>
              <Register />
              <InfoTooltip isDataLoad={isDataLoad} onClose={closeAllPopups} />
            </>
          }
          />

          <Route path="/sign-in" element={
            <>
              <Login />
              <InfoTooltip />
            </>
          }
          />

          <Route path="/*" element={
            <>
              {loggedIn ? <Navigate replace to="/cards" /> : <Navigate to="/sign-in" />}
            </>
          }
          />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;