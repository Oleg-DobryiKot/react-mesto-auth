import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useState, useContext } from 'react';
import 'react-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [placeName, setPlaceName] = useState('');
  const [placeLink, setPlaceLink] = useState('');
  const currentUser = useContext(CurrentUserContext);

  function handlePlaceNameChange(event) {
    setPlaceName(event.target.value);
  }

  function handlePlaceLinkChange(event) {
    setPlaceLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace({
      name: placeName,
      link: placeLink
    });
  } 

  return (
    <PopupWithForm 
      name="card"
      title="Новое место"
      isOpen={ isOpen }
      onClose={ onClose }
      onSubmit={ handleSubmit }
    >
    <input 
      type="text"
      value={ placeName }
      onChange={ handlePlaceNameChange }
      placeholder="Название"
      name="name"
      className="popup__input-text popup__input-text_title"
      minLength="2"
      maxLength="30"
      required
    />
    <span className="popup__error popup__error_name">Заполните это поле</span>
    <input 
      type="url"
      value={ placeLink }
      onChange={ handlePlaceLinkChange }
      placeholder="Сыылка на картинку"
      name="link"
      className="popup__input-text popup__input-text_link"
      required
    />
    <span className="popup__error popup__error_link">Введите URL картинки</span>
  </PopupWithForm>
  )
}

export default AddPlacePopup;