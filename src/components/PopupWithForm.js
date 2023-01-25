function PopupWithForm({ name, isOpen, title, ariaLabel, buttonText, onClose, onSubmit, isEnabled, children }) {
  return (
    <section className={`popup popup_type_${name} ${isOpen ? 'popup_visible' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__header">{title}</h2>
        <form method="post" className="form" name={name} id={name} onSubmit={onSubmit}>
          {children}
          <button className={`form__submit ${isEnabled ? "" : "form__submit_disabled"}`}  type="submit" aria-label={ariaLabel} name={`popup-form-submit_${name}`}>{buttonText}</button>
        </form>
        <button onClick={onClose} className="popup__close" type="button" aria-label="Закрытие попапа"></button>
      </div>
    </section>
  );

}
export default PopupWithForm;
