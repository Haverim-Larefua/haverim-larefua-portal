import React, { useState } from "react";
import { NavLink, useHistory, withRouter } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../assets/icons/logo.svg';
import AuthService from "../../../services/authService";

import './Header.scss';

const Header: React.FC = () => {
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    setShowMenu(true);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logout = () => {
    console.log('logout');
    hideMenu();
    AuthService.logout();
    history.push('/');
  }
  
  const about = () => {
    console.log('about');
    hideMenu();
  }

  return (
    <div className="ffh-header">
      <Logo />
      <nav className="ffh-header__nav">
        <NavLink activeClassName="ffh-nav__item--active "  className="ffh-nav__item" to='/admin' >מבט על</NavLink>
        <NavLink activeClassName="ffh-nav__item--active " className="ffh-nav__item" to='/parcels'> חבילות</NavLink>
        <NavLink activeClassName="ffh-nav__item--active "  className="ffh-nav__item" to='/users' > שליחים</NavLink>
      </nav>
      
      <button  className="ffh-header__user" onClick={openMenu} />
      {showMenu &&
          <ul className="ffh-header__menu">
            <li onClick={logout} >logout</li>
            <li onClick={about} >about</li>
          </ul>
      }   
    </div>
  );
}

export default withRouter(Header);