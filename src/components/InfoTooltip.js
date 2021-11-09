import React from 'react';

function InfoTooltip({ isOpen, onClose, status }) {

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__info">
        <button type="button" aria-label="закрыть попап" className="popup__close" onClick={onClose}></button>
        <div className={`popup__status ${status ? 'popup__status_success' : 'popup__status_fail'}`}></div>
        <h2 className="popup__header popup__header_center">{status ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
      </div>
      <div className="popup__overlay" onClick={onClose}></div>
    </div>
  );
}

export default InfoTooltip;