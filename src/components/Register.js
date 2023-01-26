import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from "../utils/Auth";
//import './styles/Register.css';
import FormRegister from "./FormRegister";
import { isError } from "../utils/utils.js";

const Register = () => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate();

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    auth.register(formValue.email, formValue.password)
      .then((res) => {
        navigate('/login', { replace: true });
      }
      )
      .catch(isError)
  }

  return (
    <div className="register">
      <h1 className="register__welcome">
        Регистрация
      </h1>
      <FormRegister
        textButton="Зарегистрироваться"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formValue={formValue}
      />
      <div className="register__signin">
        <p className="register__correction">Уже зарегистрированы?</p>
        <Link to="login" className="register__login-link">Войти</Link>
      </div>
    </div>
  );
}

export default Register;