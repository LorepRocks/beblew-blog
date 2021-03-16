import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as postsActions from '../actions/postsActions';

import Api from '../Api';
import Footer from '../components/Footer';
import Error from '../components/Error';
import Loading from '../components/Loading';
import RecommendedPost from '../components/RecommendedPost';
import moment from 'moment';

//stylesheets
import '../styles/shared.css';
import '../styles/post.css';
import '../styles/media-tablet.css';
import '../styles/media-laptop.css';
import '../styles/media-big-desktop.css';


class Post extends React.Component {

  

  async componentDidMount(props) {
    const slug = this.props.match.params.postSlug;
    this.parse = require('html-react-parser');
    this.moment = require('moment');
    console.log('____componentDidMount post');
    await this.props.getPost(slug);
    await this.props.getRecommendedPosts(slug);
    this.updateStyles();
  }

  updateStyles = () => {
    document.body.style.position = 'unset';
    this.header = document.querySelector('.header-post');
    this.header.classList.add('post-dark-bg');
    this.iconbox = document.querySelectorAll('.iconbox');
    this.iconbox.forEach((item) => {
      item.classList.add('post-dark-color');
    });
    this.logo = document.querySelector('.logo');
    this.logo.classList.add('post-dark-color');
  };

  handleMoreOptionsClick = (e) => {
    const moreOptions = document.querySelector('.more_options');
    const optionsIcon = document.querySelector('.options_icon');
    let visible;
    moreOptions.classList.forEach((classItem) => {
      visible = classItem === 'show' ? true : false;
    });
    if (visible) {
      moreOptions.classList.remove('show');
      optionsIcon.classList.remove('rotate');
    } else {
      moreOptions.classList.add('show');
      optionsIcon.classList.add('rotate');
    }
  };


  componentWillUnmount() {
    this.header.classList.remove('post-dark-bg');
    this.iconbox.forEach((item) => {
      item.classList.remove('post-dark-color');
    });
    this.logo.classList.remove('post-dark-color');
  }

  render() {
    
    
    const post = this.props.post || {};
    if (this.props.error) {
      return <Error />;
    }
    
    if(!this.props.loading){
      console.log('____open post render');
      return (
        <article className='post-container'>
          <div className='article__info-container'>
            <div className='article-header gradient'>
              <Link className='back-button' to='/'></Link>
            </div>
            <div className='article-props gradient'>
              <div className='article-title'>{post.title}</div>
              <div className='post__tags article-tags'>
                {post.tags && post.tags.map((tag) => (
                  <div
                    key={tag.id}
                    className='post__tag article-tag animate__animated animate__fadeInDown'
                  >
                    {tag.name}
                  </div>
                ))}
              </div>
              <div className='article-info-box'>
                <div className='icon-a author-icon'></div>
                <div className='article-author'>{post.primary_author && post.primary_author.name}</div>
                <div className='icon-a date-icon'></div>
                <div className='article-date'>
                  {moment(post.created_at).format('MMM DD YYYY')}
                </div>
              </div>
            </div>
            <div className='wave'></div>
            <div className='article-text'>{post.html && this.parse(`${post.html}`)}</div>
            <div onClick={this.handleMoreOptionsClick} className='options shadow'>
              <div className='options_icon'></div>
            </div>
            {this.props.showShareOptions && (
            <div className='more_options'>
              <div className='options_list'>
                <a
                  className='redirect'
                  href={`https://www.facebook.com/sharer/sharer.php?u=${window.location}`}
                >
                  <span className='icon-share shadow option-facebook fa fa-facebook-f'></span>
                </a>
                <a
                  className='redirect'
                  href={`https://twitter.com/share?text=Te%20recomiendo%20este%20blog%20post%20&url=${window.location}`}
                >
                  <span className='icon-share shadow option-twitter fa fa-twitter'></span>
                </a>
                <a
                  className='redirect'
                  href={`whatsapp://send?text=${window.location}`}
                >
                  <span className='icon-share shadow option-whatsapp fa fa-whatsapp'></span>
                </a>
              </div>
            </div>
            )}
              <RecommendedPost posts={this.props.recommendedPosts} />
            <Footer />
          </div>
        </article> 
      );
    }else{
      return <Loading />;
    }
    
  }
}

const mapStateToProps = (reducers) => {
  return reducers.postsReducer;
} 

export default connect(mapStateToProps,postsActions)(Post);
