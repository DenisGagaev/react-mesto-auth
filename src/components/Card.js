import React from "react";

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (

    <article className="element">
      <img className="element__image" 
      src={props.card.link} 
      alt={props.card.name} 
      onClick={handleClick} 
      />
      <div className="element__info">
        <h2 className="element__text">{props.card.name}</h2>
        <div className="element__like-container">
          <button className="element__like" type="button"></button>
          <span className="element__like-counter">{props.likeCounter}</span>
        </div>
        <button className="elements__delete" type="button"></button>
      </div>
    </article>
  );
}

export default Card;
