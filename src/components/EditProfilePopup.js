import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useState, useEffect, useContext } from 'react';
import 'react-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({
      name: name,
      about: description
    });
  } 

  useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser]); 

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={ isOpen }
      onClose={ onClose }
      onSubmit={ handleSubmit }
    >
    <input
      type="text"
      value={ name }
      onChange={ handleNameChange }
      placeholder="Имя"
      name="name"
      className="popup__input-text popup__input-text_name"
      minLength="2"
      maxLength="40"
      required
    />
    <span className="popup__error popup__error_name">Введите имя</span>
    <input
      type="text"
      value={ description }
      onChange={ handleDescriptionChange }
      placeholder="Род занятий"
      name="description"
      className="popup__input-text popup__input-text_description"
      minLength="2"
      maxLength="200"
      required
    />
    <span className="popup__error popup__error_description">Введите род занятий</span>
  </PopupWithForm>
  )
}

export default EditProfilePopup;