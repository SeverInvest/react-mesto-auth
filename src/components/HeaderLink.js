import { Link } from "react-router-dom";

function HeaderLink(linkTo, textLink, email, className, onSignOut = "") {
  return (
    <div className="header__container">
      {email && (<p className="header__email">{email}</p>)}
      <Link
        to={linkTo}
        className={className}
        onClick={onSignOut}
      >
        {textLink}
      </Link>
    </div>
  )
}

export default HeaderLink;