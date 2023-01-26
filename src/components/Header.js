import logo from '../images/logo.svg';
import { Route, Routes } from "react-router-dom";
import HeaderLink from "./HeaderLink"

function Header({ onSignOut, email }) {

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип сайта" />
      <Routes>
        <Route
          path="/sign-in"
          element={
            <HeaderLink linkTo="sign-up" textLink="Регистрация" email={email} className="header__link"/>
          }
        />

        <Route
          path="/sign-up"
          element={
            <HeaderLink linkTo="sign-in" textLink="Войти" email={email} className="header__link"/>
          }
        />

        <Route
          exact path="/"
          element={
            <HeaderLink linkTo="sign-in" textLink="Выйти" email={email} className="header__exit" onSignOut={onSignOut}/>
          }
        />
      </Routes>
    </header>
  );
}
export default Header;