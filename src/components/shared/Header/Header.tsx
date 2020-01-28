import React from 'react';

import './Header.scss';

const Header: React.FC = () => {
  return (
    <div className="fhh-header">
      <div className="fhh-header__logo">חברים לרפואה</div>
      <nav className="fhh-header__nav">
        <a href="/#1" className="fhh-nav__item">מבט על</a>
        <a href="/#2" className="fhh-nav__item">חבילות</a>
        <a href="/#3" className="fhh-nav__item--selected">שליחים</a>
      </nav>
      <div className="fhh-header__user">

      </div>
    </div>
  );
}

export default Header;
