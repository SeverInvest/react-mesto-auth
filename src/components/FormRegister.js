function FormRegister(textButton, handleSubmit, handleChange, formValue) {


  return (
    <form onSubmit={handleSubmit} className="form-register">
      <label htmlFor="email" className="form-register__label">
        Email:
      </label>
      <input
        required
        className="form-register__input"
        id="email"
        name="email"
        type="email"
        value={formValue.email}
        onChange={handleChange}
      />
      <label htmlFor="password" className="form-register__label">
        Пароль:
      </label>
      <input
        required
        className="form-register__input"
        id="password"
        name="password"
        type="password"
        value={formValue.password}
        onChange={handleChange}
      />
      <div className="form-register__button-container">
        <button type="submit" className="form-register__submit">{textButton}</button>
      </div>
    </form>
  )
}

export default FormRegister;