import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isDataLoad }) {

  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(
      avatarRef.current.value,
    );
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="popup__form"
      id="popap__avatar"
      title="Обновить аватар"
      saveName={isDataLoad ? 'Сохраняем...' : 'Сохранить'}
    >
      <label className="popup__form-field">
        <input
          ref={avatarRef}
          name="avatar"
          className="popup__input"
          id="popup__avatarLink-input"
          placeholder="Ссылка на изображение"
          type="url"
        />
        <span id="popup__avatarLink-input-error" className="popup__input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;