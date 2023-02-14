import { useState } from 'react';
import FormRegister from "../FormRegister";

function Register ({ handleRegister }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
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
    handleRegister(formValue);
  }

  return (
    <FormRegister
      theme="dark"
      textHeader="Регистрация"
      textButton="Зарегистрироваться"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formValue={formValue}
      additionally={true}
      formValidate={formValidate}
    />
  );
}

export default Register;