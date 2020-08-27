import React from 'react';
import { Link } from 'react-router-dom';
import Api from '../Api';
import Footer from '../components/Footer';
import Error from '../components/Error';
import Loading from '../components/Loading';
import RecommendedPost from '../components/RecommendedPost';
import '../styles/shared.css';
import '../styles/post.css';
import '../styles/media-tablet.css';
import '../styles/media-laptop.css';
import '../styles/media-big-desktop.css';
class Post extends React.Component {
  state = {
    loading: true,
    error: null,
    post: {},
    posts: [],
  };

  componentDidMount() {
    this.parse = require('html-react-parser');
    this.moment = require('moment');
    this._ = require('lodash');
    this.updateStyles();
    this.api = new Api();
    this.readPost();
    this.recommendedPosts();
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
    console.log('more options  ', e.target);
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

  readPost = async () => {
    this.setState({ loading: true, error: null });
    const slug = this.props.match.params.postSlug;
    console.log('slug', slug);
    await this.api
      .getPostBySlug(slug)
      .then((post) => {
        console.log('___post', post);
        this.setState({
          loading: false,
          post: post,
        });
      })
      .catch((err) => {
        console.log('____CAtch error');
        this.setState({
          loading: false,
          error: err.message,
        });
      });
  };

  recommendedPosts = async () => {
    let postsList;
    await this.api
      .getPosts()
      .then((posts) => {
        postsList = posts;
      })
      .catch((err) => {
        console.error('Error trying to get posts', err);
      });
    this.setState({
      posts: this._.sampleSize(postsList, 2),
    });
    console.log('____recommended post', this.state.posts);
  };

  componentWillUnmount() {
    this.header.classList.remove('post-dark-bg');
    this.iconbox.forEach((item) => {
      item.classList.remove('post-dark-color');
    });
    this.logo.classList.remove('post-dark-color');
  }

  render() {
    const post = this.state.post;
    if (this.state.error) {
      return <Error />;
    }
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <article className='post-container'>
        <div className='article__info-container'>
          <div className='article-header gradient'>
            <Link className='back-button' to='/'></Link>
          </div>
          <div className='article-props gradient'>
            <div className='article-title'>{post.title}</div>
            <div className='post__tags article-tags'>
              {post.tags.map((tag) => (
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
              <div className='article-author'>{post.primary_author.name}</div>
              <div className='icon-a date-icon'></div>
              <div className='article-date'>
                {this.moment(post.created_at).format('MMM DD YYYY')}
              </div>
            </div>
          </div>
          <div className='wave'></div>
          <div className='article-text'>{this.parse(`${post.html}`)}</div>
          <div onClick={this.handleMoreOptionsClick} className='options shadow'>
            <div className='options_icon'></div>
          </div>
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
          <RecommendedPost posts={this.state.posts} />
          <Footer />
        </div>
      </article>
    );
  }
}

export default Post;
