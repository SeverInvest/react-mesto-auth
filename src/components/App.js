import { useState, useEffect } from 'react';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import ImagePopup from './ImagePopup';
import api from "../utils/Api";
import { isError } from "../utils/utils.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletingCard, setDeletingCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch(isError)
  }

  function handleUpdateAvatar(avatar) {
    api.setAvatar({ avatar: avatar })
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch(isError)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.toggleLikeCard({ idCard: card._id, methodCardLike: isLiked ? "DELETE" : "PUT" })
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(isError)
  }

  function handleCardDeleteClick(card) {
    setIsConfirmPopupOpen(true);
    setDeletingCard(card);
  }

  function handleDeleteCard(card) {
    api.deleteCard(card._id)
      .then(() => {
        setDeletingCard(null);
        setCards((newArray) => newArray.filter((item) => card._id !== item._id));
        closeAllPopups();
      })
      .catch(isError)
  }

  function handleAddPlaceSubmit(data) {
    api.setCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(isError)
  }

  useEffect(() => {
    api.getInitialData()
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch(isError)
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDeleteConfirm={handleCardDeleteClick}
          cards={cards}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleAddPlaceSubmit}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={selectedCard}
          onClose={closeAllPopups}
        />

        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleDeleteCard}
          card={deletingCard}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
