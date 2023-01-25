import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ isOpen, onClose, onDeleteCard, card }) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onDeleteCard(card);
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      buttonText="Да"
      ariaLabel="Удаление карточки"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isEnabled={true}
    />
  );
}

export default ConfirmPopup;