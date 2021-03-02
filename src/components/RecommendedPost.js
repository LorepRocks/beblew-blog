import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

import '../styles/post.css';



function RecommendedPost(props) {
  const posts = props.posts || [];
  return (
    <div className='recommended-section'>
      <div className='recommended-title'>Recomendados</div>
      <div className='recommended-post-container'>
        {posts.map((post) => (
          <Link className='redirect' to={`/post/${post.slug}`} key={post.id}>
            <div
              style={{
                backgroundImage: `url(${post.feature_image.replace(
                  'localhost',
                  '192.168.0.13'
                )})`,
              }}
              className='recommended-post'
            >
              <div className='bg-gradient'>
                <div className='recommended-post-title'>{post.title}</div>
                <div className='recommended-post-read-time'>
                  Lectura {post.reading_time} min
                </div>
                <div className='recommended-post-read'>LEER POST</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecommendedPost;
