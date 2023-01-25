import { useRef, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import Validation from './Validation';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();
  const [buttonText, setButtonText] = useState("Сохранить");
  const [validationAvatar, setValidationAvatar] = useState(" ");

  function handleAvatarChange(evt) {
    setValidationAvatar(evt.target.validationMessage);
  }

  function handleSubmit(evt) {
    setButtonText("Сохранение...");
    evt.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  useEffect(() => {
    avatarRef.current.value = '';
    setButtonText("Сохранить");
    setValidationAvatar(" ");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="upd-avatar"
      title="Обновить аватар"
      buttonText={buttonText}
      ariaLabel="Сохранение данных формы"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isEnabled={validationAvatar === ""}
    >
      <input
        required
        type="url"
        placeholder="Ссылка на аватар"
        className="form__input form__input_type_link"
        name="avatar"
        id="link-avatar"
        ref={avatarRef}
        onChange={handleAvatarChange}
      />
      <Validation
        errorMessage={validationAvatar}
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;