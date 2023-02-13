import { Link } from "react-router-dom";
// import { useState, useEffect } from 'react';

function HeaderLink({ 
  linkTo, 
  textLink, 
  email, 
  classContainer,
  classEmail,
  classLink, 
  onSignOut = "" }) {

  return (
    <div className={classContainer}>
      {email && (<p className={classEmail}>{email}</p>)}
      <Link
        to={linkTo}
        className={classLink}
        onClick={onSignOut}
      >
        {textLink}
      </Link>
    </div>
  )
}

export default HeaderLink;