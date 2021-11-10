import React, { useState, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddCard, isDataLoad }) {

    const [placeName, setPlaceName] = useState('');
    const [placeLink, setPlaceLink] = useState('');


    function handleChangePlaceName(e) {
        setPlaceName(e.target.value);
    }

    function handleChangePlaceLink(e) {
        setPlaceLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        //* Передаём значения управляемых компонентов во внешний обработчик
        onAddCard({
            name: placeName,
            link: placeLink,
        });
    }

    useEffect(() => {
        setPlaceName('');
        setPlaceLink('');
    }, [isOpen]);

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            name="popup__form"
            id="popup__card"
            title="Новое место"
            saveName={isDataLoad ? 'Сохранение...' : 'Создать'}
        >
            <label className="popup__form-field">
                <input
                    value={placeName} onChange={handleChangePlaceName}
                    name="photoText"
                    className="popup__input"
                    id="popup__photoText-input"
                    required
                    minLength="2"
                    maxLength="30"
                    placeholder="Название карточки"
                    type="text"
                />
                <span id="popup__photoText-input-error" className="popup__input-error"></span>
            </label>
            <label className="popup__form-field">
                <input
                    value={placeLink} onChange={handleChangePlaceLink}
                    name="photoLink"
                    className="popup__input"
                    id="popup__photoLink-input"
                    required
                    placeholder="Ссылка на картинку"
                    type="url"
                />
                <span id="popup__photoLink-input-error" className="popup__input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;