import React from 'react';
import Navbar from './Navbar';
import '../styles/shared.css';
import Search from '../pages/Search';
import Api from '../Api';

class Header extends React.Component {
  state = {
    showSearch: false,
    class: '',
    darkMode: localStorage.getItem('darkMode') === 'true' ? true : false,
    themeIcon: 'fa-moon-o',
    posts: [],
  };
  componentDidMount() {
    this.api = new Api();
    this.getPosts();
  }
  getPosts = async () => {
    await this.api.getPosts().then((posts) => {
      this.setState({
        posts: posts,
      });
    });
  };

  handleToggleClick = (e) => {
    console.log('___click search');
    this.setState((prevState) => {
      return {
        showSearch: prevState.showSearch ? false : true,
        class: prevState.showSearch ? '' : 'open',
      };
    });
  };

  handleNavClose = () => {
    this.setState((prevState) => {
      return {
        showSearch: prevState.showSearch ? false : true,
        class: prevState.showSearch ? '' : 'open',
      };
    });
  };

  handleNavDarkToggle = () => {
    this.setState((prevState) => {
      return {
        darkMode: prevState.darkMode ? false : true,
      };
    });
  };

  render() {
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
        <Navbar
          onAdjustClick={this.handleNavDarkToggle}
          themeIcon={this.state.themeIcon}
          darkMode={this.state.darkMode}
          onSearchClick={this.handleToggleClick}
        />
        {this.state.showSearch && (
          <Search
            onClose={this.handleNavClose}
            addClass={this.state.class}
            posts={this.state.posts}
          />
        )}
      </header>
    );
  }
}

export default Header;
