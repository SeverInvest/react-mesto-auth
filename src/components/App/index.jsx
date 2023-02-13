import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Main from '../Main';
import Header from '../Header';
import Footer from '../Footer';
import EditProfilePopup from '../EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup';
import AddPlacePopup from '../AddPlacePopup';
import ConfirmPopup from '../ConfirmPopup';
import ProtectedRoute from '../ProtectedRoute';
import Login from '../Login';
import Register from '../Register';
import ImagePopup from '../ImagePopup';
import InfoTooltip from '../InfoTooltip';
import api from "../../utils/Api";
import auth from "../../utils/Auth";
import { isError } from "../../utils/utils";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletingCard, setDeletingCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const navigate = useNavigate();

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
    setIsInfoTooltipPopupOpen(false);
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

  function handleRegister() {
    setIsInfoTooltipPopupOpen(true);
  }

  function onSuccess(isSuccess) {
    setIsSuccessful(isSuccess);
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate("/", { replace: true });
        })
        .catch(isError)
    }
  }, [navigate]);

  useEffect(() => {
    if (loggedIn) {
      api.getInitialData()
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch(isError)
    }
  }, [loggedIn]);

  function handleSingOut() {
    localStorage.removeItem("jwt");
    setEmail("");
    setLoggedIn(false);
    navigate("/sign-in", { replace: true });
  }

  function escFunction(evt) {
    if (evt.key === "Escape") {
      closeAllPopups()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", escFunction);
    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, []);

function clickPass(evt) {
  if (evt.target === evt.currentTarget) {
    closeAllPopups();
  }
}

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email}
          onSignOut={handleSingOut}
          loggedIn={loggedIn}
        />

        <Routes>
          <Route exact path="/" element={
            <ProtectedRoute
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDeleteConfirm={handleCardDeleteClick}
              cards={cards}
              component={Main}
            />}
          />
          <Route path="/sign-up" element={<Register handleRegister={handleRegister} onSuccess={onSuccess} />} />
          <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
        </Routes>

        {loggedIn &&
          <Footer />
        }
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onClickPass={clickPass}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleAddPlaceSubmit}
          onClickPass={clickPass}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={selectedCard}
          onClose={closeAllPopups}
          onClickPass={clickPass}
        />

        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleDeleteCard}
          card={deletingCard}
          onClickPass={clickPass}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onClickPass={clickPass}
        />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccessful={isSuccessful}
          onClickPass={clickPass}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
