function ButtonSubmit({
  buttonClass, buttonAriaLabel,
  buttonName, buttonText }) {

  return (
    <button
      className={buttonClass}
      type="submit"
      aria-label={buttonAriaLabel}
      name={buttonName}
    >
      {buttonText}
    </button>
  )
}
export default ButtonSubmit;