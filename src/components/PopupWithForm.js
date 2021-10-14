import React from "react";

function PopupWithForm(props) {

	const { id, isOpen, name, children, title, onClose, idForm } = props;

	return (
		<div className={`popup ${isOpen && 'popup_opened'}`} id={id}>
			<div className="popup__container">
				<button className="button" aria-label="закрыть попап" className="popup__close" onClick={onClose}></button>
				<h2 className="popup__header">{title}</h2>
				<form className="popup__form" name={name} id={idForm} autocomplete="off" novalidate>
					<fieldset className="popup__set">
						{children}
						<button type="submit" className="popup__button">Сохранить</button>
					</fieldset>
				</form>
			</div>
			<div className="popup__overlay" onClick={onClose}></div>
		</div>
	);
}

export default PopupWithForm;