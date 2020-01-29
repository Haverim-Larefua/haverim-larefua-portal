import React from 'react';
import { Link } from 'react-router-dom';


import './Header.scss';
const Header: React.FC = () => {
  return (
    <div className="fhh-header">
      <div className="fhh-header__logo">חברים לרפואה</div>
      <nav className="fhh-header__nav">
        <li><Link className="fhh-nav__item" to='/admin' >מבט על</Link></li>
        <li><Link className="fhh-nav__item" to='/parcels'> חבילות</Link></li>
        <li><Link className="fhh-nav__item--selected" to='/users' > שליחים</Link></li>
      </nav>
      <div className="fhh-header__user">

      </div>
    </div>
  );
}

export default Header;
