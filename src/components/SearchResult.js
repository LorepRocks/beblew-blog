import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/shared.css';

function SearchResult(props) {
  return (
    <div className='search-results'>
      {props.posts.map((post) => (
        <div key={post.id} className='post-result-container'>
          <Link
            onClick={props.onClose}
            className='redirect'
            to={`/post/${post.slug}`}
          >
            <div className='post-result-title'>{post.title}</div>
            <div className='post-result-time-read'>
              Lectura {post.reading_time} Min
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default SearchResult;
