import { useState, useEffect } from 'react';
import PopupWithForm from '../PopupWithForm';
import Validation from '../Validation';

function AddPlacePopup({
  isOpen,
  onClose,
  onSubmit,
  onClickPass,
  changeButtonText,
  buttonText
}) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [validationName, setValidationName] = useState(" ");
  const [validationLink, setValidationLink] = useState(" ");

  function handleNameChange(evt) {
    setName(evt.target.value);
    setValidationName(evt.target.validationMessage);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
    setValidationLink(evt.target.validationMessage);
  }

  function handleSubmit(evt) {
    changeButtonText(true);
    evt.preventDefault();
    onSubmit({
      name: name,
      link: link,
    });
  }

  useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
      setValidationName(" ");
      setValidationLink(" ");
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      buttonText={buttonText}
      ariaLabel="Добавление карточки"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isEnabled={(validationLink === "" && validationName === "")}
      onClickPass={onClickPass}
    >
      <input
        required
        minLength="2"
        maxLength="30"
        type="text"
        placeholder="Название"
        className="form__input form__input_type_place"
        name="name"
        id="place-header"
        onChange={handleNameChange}
        value={name}
      />
      <Validation
        errorMessage={validationName}
      />
      <input
        required
        type="url"
        placeholder="Ссылка на картинку"
        className="form__input form__input_type_link"
        name="link"
        id="link"
        onChange={handleLinkChange}
        value={link}
      />
      <Validation
        errorMessage={validationLink}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;