import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from "../../utils/Auth";
import { isError } from "../../utils/utils";
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