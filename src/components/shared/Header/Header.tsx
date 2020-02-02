import React from 'react';
import { NavLink } from 'react-router-dom';


import './Header.scss';
const Header: React.FC = () => {

  return (
    <div className="fhh-header">
      <div className="fhh-header__logo">חברים לרפואה</div>
      <nav className="fhh-header__nav">
        <NavLink activeClassName="fhh-nav__item--active "  className="fhh-nav__item" to='/admin' >מבט על</NavLink>
        <NavLink activeClassName="fhh-nav__item--active " className="fhh-nav__item" to='/parcels'> חבילות</NavLink>
        <NavLink activeClassName="fhh-nav__item--active "  className="fhh-nav__item" to='/users' > שליחים</NavLink>
      </nav>
      <div className="fhh-header__user">

      </div>
    </div>
  );
}

export default Header;
