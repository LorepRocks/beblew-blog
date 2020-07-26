import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';
import '../styles/shared.css';

function PostItem(props) {
  const post = props.post;
  console.log('___post', post);
  return (
    <article className='post shadow large'>
      <div className='post__header'>
        <div className='post__options'>
          <div className='post__options_save '></div>
          <div className='post__options_share'></div>
          <div className='post__options_pin'></div>
        </div>
      </div>
      <Link to={`post/${post.slug}`} className='redirect'>
        <div className='post__info_container'>
          <div className='post__title'>
            <div className='post__title_box'>{post.title}</div>
            <span></span>
          </div>
          <div className='post__item'>
            <div className='post__info'>
              <blockquote className='post__author'>
                {post.primary_author.name}
              </blockquote>
              <div className='post__tags'>
                {post.tags.map((tag) => (
                  <div key={tag.id} className='post__tag'>
                    {tag.name}
                  </div>
                ))}
              </div>
            </div>
            <div className='post__preview'>{post.excerpt}</div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default PostItem;
