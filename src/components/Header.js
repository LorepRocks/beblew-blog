import React from 'react';
import '../styles/shared.css';

function Header(props) {
  return (
    <header className='header shadow header-post'>
      <div className='logo'>Logo</div>
      <div className='backdrop'></div>
      <div className='toggle-button'></div>
    </header>
  );
}

export default Header;
