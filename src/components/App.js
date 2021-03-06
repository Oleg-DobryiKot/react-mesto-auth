import './styles/App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { useState, useEffect, useContext } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import 'react-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { ErrorMessageContext } from '../contexts/ErrorMessageContext';
import AddPlacePopup from './AddPlacePopup';
import * as auth from '../utils/auth';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';

function App() {
  const initialData = {email: '', password: ''};
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [data, setData] = useState(initialData);
  const [cards, setCards] = useState([]);
  const [errorMessageState, setErrorMessageState]  = useState('');
  const history = useHistory();
  
  useEffect(() => {

    tokenCheck();

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
      .then(info => {
        setCurrentUser(info);
      })
      .catch(console.error);
  }, [])

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then(res => {
          if (res) {
            // debugger;
            setData({email: res.data.email});
            setLoggedIn(true);
          }
        })
        .catch(() => { history.push('/sign-in') });
    }
    else {
      history.push('/sign-in');
    }
  }

  function handleLogin({email, password}) {
    return auth.authorize(email, password)
      .then(res => {
        if (!res || res.statusCode === 400) throw new Error('Что то пошло не так!')
        if (res.statusCode === 401) throw new Error('Нет пользователя с таким e-mail...');
        if (res.token) {
          setLoggedIn(true);
          setData({email, password});
          localStorage.setItem('jwt', res.token);
        }
      });
  }

  function handleRegister({email, password}) {
    return auth.register(email, password)
      .then(res => {
        if (!res || res.statusCode === 400) {
          setIsRegistered(false);
          setErrorMessageState('Такой пользователь уже зарегестрирован!')
        }
        setIsRegistered(true);
        return res;
      })
      .catch(() => setErrorMessageState('Что-то не так с запросом на сервер!'))
  }

  function handleLoggedOut() {
    localStorage.removeItem('jwt');
    setData(initialData);
    setLoggedIn(false);
    history.push('/sign-in');
  }

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

  function handleShowTooltip() {
    setIsTooltipOpen(true);
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
    setIsTooltipOpen(false);
    setSelectedCard({});
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={ currentUser }>       
      <ErrorMessageContext.Provider value={{ message: errorMessageState, setErrorMessage: message => setErrorMessageState(message) }}>       

        <Header loggedIn={ loggedIn } onLoggedOut={ handleLoggedOut } userData={ data }/>
          <Switch>
            <ProtectedRoute exact path="/" 
              onEditProfile={ handleEditProfileClick }
              onAddPlace={ handleAddPlaceClick }
              onEditAvatar={ handleEditAvatarClick }
              onCardClick={ handleCardClick }
              onCardLike={ handleCardLike }
              onCardDelete={ handleCardDelete }
              cards={ cards }
              loggedIn={ loggedIn }
              component={ Main }
            />
            <Route path="/sign-up">
              <Register 
              onRegister={ handleRegister }
              onShowTooltip={ handleShowTooltip }
            />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={ handleLogin } />
            </Route>
            <Route exact path="/">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
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
      <InfoTooltip 
        isOpen={ isTooltipOpen }
        onClose={ closeAllPopups }
        isRegistered = {isRegistered}
      />
      </ErrorMessageContext.Provider>
      </CurrentUserContext.Provider>
  </div>

  );
}

export default App;
