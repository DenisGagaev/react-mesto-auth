import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isDataLoad }) {
  const [profileName, setProfileName] = useState('');
  const [profileDescription, setDescription] = useState('');

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  function handleChangeName(e) {
    setProfileName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: profileName,
      about: profileDescription,
    });
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setProfileName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 


  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      name="popup__form"
      idForm="popup__form-profile"
      id="popup__Profile"
      title="Редактировать профиль"
      onSubmit={handleSubmit}
      saveName={isDataLoad ? "Сохраняем..." : "Сохранить"}
    >
      <label className="popup__form-field">
        <input
          value={profileName || ''} onChange={handleChangeName}
          className="popup__input"
          type="text"
          required
          minLength="2"
          maxLength="40"
          id="popup__name-input"
          name="name"
          placeholder="Ваше имя"
        />
        <span id="popup__name-input-error" className="popup__input-error"></span>
      </label>
      <label className="popup__form-field">
        <input
          value={profileDescription || ''} onChange={handleChangeDescription}
          className="popup__input"
          type="text"
          required
          minLength="2"
          maxLength="200"
          id="popup__text-input"
          name="about"
          placeholder="О Вас"
        />
        <span id="popup__text-input-error" className="popup__input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;