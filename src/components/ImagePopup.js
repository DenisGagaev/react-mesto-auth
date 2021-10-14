function ImagePopup(props) {
  return (
    <div className={`popup ${props.card.isOpen && 'popup_opened'}`}>
      <div className="popup__image">
        <img className="popup__photo" src={`${props.card.element.link}`} alt={props.card.element.name} />
        <p className="popup__image-subtitle">{props.card.element.name}</p>
        <button type="button" aria-label="закрыть попап" className="popup__close" onClick={props.onClose}></button>
      </div>
      <div className="popup__overlay" onClick={props.onClose}></div>
    </div>
  );
}

export default ImagePopup;

