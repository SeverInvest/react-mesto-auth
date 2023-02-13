import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from "../../utils/Auth";
import FormRegister from "../FormRegister";
import { isError } from "../../utils/utils";

function Register ({ handleRegister, onSuccess }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })
  const [formValidate, setFormValidate] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();

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
    auth.register(formValue.email, formValue.password)
      .then(() => {
        setFormValue({ email: '', password: '' });
        onSuccess(true);
        handleRegister();
        navigate('/sign-in', { replace: true });
      }
      )
      .catch((error) => {
        onSuccess(false);
        handleRegister();
        isError(error);
      }) 
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