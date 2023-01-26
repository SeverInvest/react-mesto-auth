import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from "../utils/Auth";
//import './styles/Login.css';
import { isError } from "../utils/utils.js";
import FormRegister from "./FormRegister";

const Login = ({ handleLogin }) => {
  const [formValue, setFormValue] = useState({
    username: '',
    password: ''
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
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth.authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setFormValue({ email: '', password: '' });
          handleLogin();
          navigate('/', { replace: true });
        }
      })
      .catch(isError)
  }

  return (
    <div className="register">
      <h1 className="register__welcome">
        Вход
      </h1>
      <FormRegister
        textButton="Войти"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formValue={formValue}
      />
    </div>
  )
}

export default Login;