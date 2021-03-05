import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useState, useEffect, useRef } from 'react';
import 'react-dom';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  } 

  return (
    <PopupWithForm 
      name="update-avatar"
      title="Обновить аватар"
      isOpen={ isOpen }
      onClose={ onClose }
      onSubmit={ handleSubmit }
  >
    <input 
      type="url"
      placeholder="Ссылка на аватарку..."
      name="avatar"
      ref={ avatarRef }
      className="popup__input-text"
      required
    />
    <span className="popup__error popup__error_avatar">Введите URL аватарки</span>
  </PopupWithForm>
  )
}

export default EditAvatarPopup;