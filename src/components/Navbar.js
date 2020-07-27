import React from 'react';
import '../styles/shared.css';

function Navbar(props) {
  return (
    <nav className={`mobile-nav ${props.class}`}>
      <div onClick={props.onClose} className='close'></div>
      {/*  <div className='mobile-nav__profile'>
        <div className='profile_photo'></div>
        <div className='profile_container'>
          <div className='profile_name'>Lorena Rojas</div>
          <a className='profile_view' href='#'>
            View Profile
          </a>
        </div>
      </div> */}
      <ul className='mobile-nav__items'>
        <li className='mobile-nav__item darkmode'>
          <div className='iconbox'>
            <span className='icon icon-dark'></span>
            <a>Dark Mode</a>
          </div>
          <label className='switch'>
            <input
              onChange={props.onToggleDark}
              type='checkbox'
              className='toggle'
              checked={props.darkMode}
            />
            <span className='slider round'></span>
          </label>
        </li>
        <li className='mobile-nav__item iconbox'>
          <span className='icon icon-home-post'></span>
          <a className='active'>Buscar</a>
        </li>
        <li className='mobile-nav__item iconbox'>
          <span className='icon icon-saved-post'></span>
          <a>Últimos Posts</a>
        </li>
        <li className='mobile-nav__item iconbox'>
          <span className='icon icon-liked-post'></span>
          <a>Tags</a>
        </li>
        {/*  <li className='mobile-nav__item iconbox'>
          <span className='icon icon-settings'></span>
          <a>Settings</a>
        </li>
        <li className='mobile-nav__item iconbox'>
          <span className='icon icon-help'></span>
          <a>Help</a>
        </li>
        <li className='mobile-nav__item iconbox'>
          <span className='icon icon-logout'></span>
          <a>Logout</a>
        </li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
