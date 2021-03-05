import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({onCardClick, onCardLike, onCardDelete, link, name, likes, owner, _id}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = owner._id === currentUser._id;
  const isLiked = likes.some(item => item._id === currentUser._id);
  const cardDeleteButtonClassName = (
    `element__trash-icon ${isOwn ? 'element__trash-icon_visible' : 'element__trash-icon_hidden'}`
  );
  const cardLikeButtonClassName = (
    `element__like-icon ${isLiked ? 'element__like-icon_active' : ''}`); 

  function handleClick() {
    onCardClick({link, name});
  }

  function handleLikeClick() {
    onCardLike({_id, name, link, likes, owner})
  }

  function handleDeleteClick() {
    onCardDelete({_id, name, link, likes, owner});
  }

  return (
    <div className="element">
      <img 
        className="element__image"
        src={ link }
        alt={ name }
        onClick={ handleClick }
      />
      <div className="element__description">
        <h3 className="element__title">{ name }</h3>
        <button 
          type="button" 
          className={ cardDeleteButtonClassName }
          onClick={ handleDeleteClick }
        >
        </button>
        <div className="element__likes">
          <button 
            type="button" 
            className={ cardLikeButtonClassName }
            onClick={ handleLikeClick }
          >
          </button>
          <span className="element__like-count">{ likes.length }</span>
        </div>
      </div>
    </div>
  )
}

export default Card;