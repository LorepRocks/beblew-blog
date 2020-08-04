import React from 'react';
import '../styles/shared.css';

function Navbar(props) {
  return (
    <nav>
      <ul className='mobile-nav__items'>
        <li onClick={props.onAdjustClick} className='mobile-nav__item iconbox'>
          <span
            className={`icon fa ${props.darkMode ? 'fa-sun-o' : 'fa-moon-o'}`}
          ></span>
        </li>
        <li onClick={props.onSearchClick} className='mobile-nav__item iconbox'>
          <span className='icon fa fa-search'></span>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
