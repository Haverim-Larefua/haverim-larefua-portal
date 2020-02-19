import React from 'react';
import { NavLink } from 'react-router-dom';


import './Header.scss';
const Header: React.FC = () => {

  return (
    <div className="ffh-header">
      <div className="ffh-header__logo">שליחים לרפואה</div>
      <nav className="ffh-header__nav">
        <NavLink activeClassName="ffh-nav__item--active "  className="ffh-nav__item" to='/admin' >מבט על</NavLink>
        <NavLink activeClassName="ffh-nav__item--active " className="ffh-nav__item" to='/parcels'> חבילות</NavLink>
        <NavLink activeClassName="ffh-nav__item--active "  className="ffh-nav__item" to='/users' > שליחים</NavLink>
      </nav>
      <div className="ffh-header__user">

      </div>
    </div>
  );
}

export default Header;
