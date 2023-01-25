import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import PopupWithForm from './PopupWithForm';
import Validation from './Validation';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [buttonText, setButtonText] = useState("Сохранить");
  const [validationName, setValidationName] = useState("");
  const [validationAbout, setValidationAbout] = useState("");

  function handleNameChange(evt) {
    setName(evt.target.value);
    setValidationName(evt.target.validationMessage);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
    setValidationAbout(evt.target.validationMessage);
  }

  function handleSubmit(evt) {
    setButtonText("Сохранение...");
    evt.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setButtonText("Сохранить");
    setValidationName("");
    setValidationAbout("");
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText={buttonText}
      ariaLabel="Сохранить изменения"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isEnabled={(validationAbout === "" && validationName === "")}
    >
      <input
        required
        minLength="2"
        maxLength="40"
        type="text"
        placeholder="Введите свое имя"
        className="form__input form__input_type_name"
        name="name"
        id="input-name"
        value={name}
        onChange={handleNameChange}
      />
      <Validation
        errorMessage={validationName}
      />
      <input
        required
        minLength="2"
        maxLength="200"
        type="text"
        placeholder="Напишите немного о себе"
        className="form__input form__input_type_about"
        name="about"
        id="input-about"
        value={description}
        onChange={handleDescriptionChange}
      />
      <Validation
        errorMessage={validationAbout}
      />
    </PopupWithForm>
  );

}
export default EditProfilePopup;
