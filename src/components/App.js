import './App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api'
import { useState, useEffect } from 'react';
import 'react-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
 
  const [cards, setCards] = useState([]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map(cardItem => cardItem._id === card._id ? newCard : cardItem);
        setCards(newCards)
      })
      .catch(console.error);
  } 

  function handleCardDelete(card) {
    const isOwner = card.owner._id === currentUser._id;

    if (!isOwner) {
      return;
    }

    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter(({ _id }) => _id !== card._id);
        setCards(newCards)
      })
      .catch(console.error);
  } 
  
  useEffect(() => {
      api.getInitialCards()
      .then(res => {
        const cards = res.map(card => {
          return {
            _id: card._id,
            name: card.name,
            link: card.link,
            likes: card.likes,
            owner: card.owner
          }
        })
        setCards(cards);
      })
      .catch(console.error);

      api.getUserInfo()
      .then(setCurrentUser)
      .catch(console.error);
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleUpdateUser(UserData) {
    api.sendUserInfo(UserData)
      .then(setCurrentUser)
      .catch(console.error);
    setIsEditProfilePopupOpen(false);
  }

  function handleUpdateAvatar(UserData) {
    api.editAvatar(UserData)
      .then(setCurrentUser)
      .catch(console.error);
    setIsEditAvatarPopupOpen(false);
  }

  function handleAddPlaceSubmit(CardData) {
    api.addNewCard(CardData)
      .then(res => {setCards([res, ...cards])})
      .catch(console.error);
    setIsAddPlacePopupOpen(false);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
      <Header/>
      <Main
        onEditProfile={ handleEditProfileClick }
        onAddPlace={ handleAddPlaceClick }
        onEditAvatar={ handleEditAvatarClick }
        onCardClick={ handleCardClick }
        onCardLike={ handleCardLike }
        onCardDelete={ handleCardDelete }
        cards={ cards }
      />
      <Footer/>
      <EditProfilePopup 
        isOpen={ isEditProfilePopupOpen }
        onClose={ closeAllPopups }
        onUpdateUser={ handleUpdateUser }
      /> 
      <AddPlacePopup
        isOpen={ isAddPlacePopupOpen }
        onClose={ closeAllPopups }
        onAddPlace={ handleAddPlaceSubmit }
      />
      <PopupWithForm 
        name="delete"
        title="Вы уверены?"
        submitText="Да"
        onClose={ closeAllPopups }
      />
      <EditAvatarPopup 
        isOpen={ isEditAvatarPopupOpen }
        onClose={ closeAllPopups }
        onUpdateAvatar={ handleUpdateAvatar }
      />
      <ImagePopup 
        card={ selectedCard }
        isOpen={ isImagePopupOpen }
        onClose={ closeAllPopups }
      />
      </CurrentUserContext.Provider>
  </div>

  );
}

export default App;
