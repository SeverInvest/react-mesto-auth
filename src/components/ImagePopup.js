function ImagePopup({ card, onClose, isOpen }) {
  return (

    <div className={`popup popup_type_photo ${isOpen ? 'popup_visible' : ''}`}>
      <div className="popup__photo-container">
        <img
          src={card?.link}
          alt={card?.name}
          className="popup__photo" />
        <p className="popup__photo-description">
          {card?.name}
        </p>
        <button
          className="popup__close"
          type="button"
          aria-label="Закрытие попапа"
          onClick={onClose}>
        </button>
      </div>
    </div>
  );
}

export default ImagePopup;