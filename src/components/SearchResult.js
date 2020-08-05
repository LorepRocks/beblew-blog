import React from 'react';
import '../styles/shared.css';

function SearchResult(props) {
  return (
    <div className='search-results'>
      {props.posts.map((post) => (
        <div className='post-result-container'>
          <div className='post-result-title'>{post.title}</div>
        </div>
      ))}
    </div>
  );
}

export default SearchResult;
