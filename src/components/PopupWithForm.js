import React from "react";

function PopupWithForm(props) {

const { id, isOpen, name, children, title, onClose, saveName, onSubmit } = props;

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`} id={id}>
      <div className="popup__container">
        <button aria-label="закрыть попап" className="popup__close" onClick={onClose}></button>
        <h2 className="popup__header">{title}</h2>
        <form className="popup__form" name={name} autoComplete="off" onSubmit={onSubmit}>
          <fieldset className="popup__set">
            {children}
            <button type="submit" className="popup__button">{saveName}</button>
          </fieldset>
        </form>
      </div>
      <div className="popup__overlay" onClick={onClose}></div>
    </div>
  );
}

export default PopupWithForm;