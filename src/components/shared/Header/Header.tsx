import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../assets/icons/logo.svg';


import './Header.scss';
import AppConstants from '../../../constants/AppConstants';
const Header: React.FC = () => {

  return (
    <div className="ffh-header">
        <Logo />
      <nav className="ffh-header__nav">
        <NavLink activeClassName="ffh-nav__item--active "  className="ffh-nav__item" to='/admin' >{AppConstants.navOverviewUIName}</NavLink>
        <NavLink activeClassName="ffh-nav__item--active " className="ffh-nav__item" to='/parcels'> {AppConstants.parcelsUIName}</NavLink>
        <NavLink activeClassName="ffh-nav__item--active "  className="ffh-nav__item" to='/users' > {AppConstants.navUsersUIName}</NavLink>
      </nav>
      <div className="ffh-header__user">

      </div>
    </div>
  );
}

export default Header;
