import React from 'react';
import Navbar from './Navbar';
import '../styles/shared.css';

class Header extends React.Component {
  state = {
    showNavbar: false,
    class: '',
    darkMode: localStorage.getItem('darkMode') === 'true' ? true : false,
  };
  handleToggleClick = (e) => {
    console.log('___click toggle');
    this.setState((prevState) => {
      return {
        showNavbar: prevState.showNavbar ? false : true,
        class: prevState.showNavbar ? '' : 'open',
      };
    });
  };

  handleNavClose = () => {
    console.log('close navbar');
    this.setState((prevState) => {
      return {
        showNavbar: prevState.showNavbar ? false : true,
        class: prevState.showNavbar ? '' : 'open',
      };
    });
  };

  handleNavDarkToggle = () => {
    console.log('___toggle Dark mode', this.state.darkMode);
    this.setState((prevState) => {
      return {
        darkMode: prevState.darkMode ? false : true,
      };
    });
  };
  render() {
    console.log('___this.state.showNavbar', this.state);
    if (this.state.darkMode) {
      localStorage.setItem('darkMode', true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      localStorage.setItem('darkMode', false);
      document.documentElement.setAttribute('data-theme', 'light');
    }
    return (
      <header className='header shadow header-post'>
        <div className='logo'>Beblew</div>
        <div className='backdrop'></div>
        <div onClick={this.handleToggleClick} className='toggle-button'></div>
        {this.state.showNavbar && (
          <Navbar
            class={this.state.class}
            onClose={this.handleNavClose}
            onToggleDark={this.handleNavDarkToggle}
            darkMode={this.state.darkMode}
          />
        )}
      </header>
    );
  }
}

export default Header;
