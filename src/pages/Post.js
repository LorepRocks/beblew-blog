import React from 'react';
import { Link } from 'react-router-dom';
import Api from '../Api';
import '../styles/shared.css';
import '../styles/post.css';
import '../styles/media-tablet.css';
import '../styles/media-laptop.css';

class Post extends React.Component {
  state = {
    loading: true,
    error: null,
    post: {},
  };

  componentDidMount() {
    document.body.style.position = 'unset';
    this.parse = require('html-react-parser');
    this.moment = require('moment');
    this.api = new Api();
    this.readPost();
  }

  readPost = async () => {
    this.setState({ loading: true, error: null });
    await this.api
      .getPostBySlug(this.props.match.params.postSlug)
      .then((post) => {
        this.setState({
          loading: false,
          post: post,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          error: err.message,
        });
      });
  };

  render() {
    const post = this.state.post;
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }
    return (
      <section>
        <main className='main-post'>
          <article className='article'>
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
                  <div className='article-author'>
                    {post.primary_author.name}
                  </div>
                  <div className='icon-a date-icon'></div>
                  <div className='article-date'>
                    {this.moment(post.created_at).format('MMM DD YYYY')}
                  </div>
                </div>
              </div>
              <div className='wave'></div>
            </div>
            <div className='article-text'>{this.parse(`${post.html}`)}</div>
          </article>
          <div className='options shadow'>
            <div className='options_icon'></div>
          </div>
          <div className='more_options'>
            <div className='options_list'>
              <div className='post__options_save'></div>
              <div className='post__options_share'></div>
              <div className='post__options_pin'></div>
            </div>
          </div>
        </main>
      </section>
    );
  }
}

export default Post;
