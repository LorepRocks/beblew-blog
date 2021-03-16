import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getPosts} from '../actions/postsActions';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import '../styles/shared.css';
import Search from '../pages/Search';


function Header(props){
  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = React.useState(false);
  const [cssClass, setCssClass] = React.useState('');
  const [darkMode, setDarkMode] = React.useState(localStorage.getItem('darkMode') === 'true' ? true : false);
  const [themeIcon, setThemeIcon] = React.useState('fa-moon-o');
  const [posts, setPost] = React.useState([]);

  useEffect(() => {
    dispatch(getPosts()).then(posts => {
      setPost(posts);
    });
  }, []);
  

  function handleToggleClick (e){
    setShowSearch(!showSearch);
    setCssClass(showSearch ? '' : 'open');
  };

  function handleNavClose(){
    document.body.style.position = 'unset';
    setShowSearch(!showSearch);
    setCssClass(showSearch ? '' : 'open');
  };

  function handleNavDarkToggle(){
    setDarkMode(!darkMode);
  };

 
    if (darkMode) {
      localStorage.setItem('darkMode', true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      localStorage.setItem('darkMode', false);
      document.documentElement.setAttribute('data-theme', 'light');
    }
    return (
      <header className='header shadow header-post'>
        <div className='logo'>
          <Link className='redirect' to='/'>
            Beblew
          </Link>
        </div>
        <div className='backdrop'></div>
        <div onClick={handleToggleClick} className='toggle-button'></div>
        <Navbar
          onAdjustClick={handleNavDarkToggle}
          themeIcon={themeIcon}
          darkMode={darkMode}
          onSearchClick={handleToggleClick}
        />
        {showSearch && (
          <Search
            onClose={handleNavClose}
            addClass={cssClass}
            posts={posts}
            onSearchClick={handleToggleClick}
          />
        )}
      </header>
    );
}

export default Header;
