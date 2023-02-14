import { useState } from 'react';
import FormRegister from "../FormRegister";

function Login({ handleLogin }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })
  const [formValidate, setFormValidate] = useState({
    email: '',
    password: ''
  })

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value
    });

    setFormValidate({
      ...formValidate, [name]: evt.target.validationMessage
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    };
    handleLogin(formValue);
  }

  return (
    <FormRegister
      theme="dark"
      textHeader="Вход"
      textButton="Войти"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formValue={formValue}
      additionally={false}
      formValidate={formValidate}
    />
  );
}

export default Login;