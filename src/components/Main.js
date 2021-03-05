import Card from './Card';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__overlay" onClick={ onEditAvatar }>
          <img 
            className="profile__avatar" 
            src={ currentUser.avatar } 
            alt="Фото профиля"
          />
        </div>
        <div className="profile__info">
          <div className="profile__edit">
            <h1 className="profile__title">{ currentUser.name }</h1>
            <button 
              type="button" 
              className="profile__edit-btn"
              onClick={ onEditProfile }>  
            </button>
          </div>
          <p className="profile__description">{ currentUser.about }</p>
        </div>
        <button 
          type="button" 
          className="profile__add-btn"
          onClick={ onAddPlace }> 
        </button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card 
            key={ card._id }
            { ...card } 
            onCardClick={ onCardClick } 
            onCardLike={ onCardLike }
            onCardDelete={ onCardDelete }
          />
          )
        )}
      </section>

    </main>
  )
}
  
export default Main;