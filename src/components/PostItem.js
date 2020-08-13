import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';
import '../styles/shared.css';

function PostItem(props) {
  const post = props.post;
  console.log('___post', post);
  const bgStyle = {
    backgroundImage: `url(${post.feature_image.replace(
      'localhost',
      '192.168.0.11'
    )})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };
  return (
    <article style={bgStyle} className=' post shadow large'>
      <div className='bg-gradient'>
        <Link to={`post/${post.slug}`} className='redirect'>
          <div className='post__info_container'>
            <div className='post__read_time animate__animated animate__tada'>
              {`Lectura ${post.reading_time} min`}
            </div>
            <div className='post__title'>
              <span></span>
              <div className='post__title_box animate__animated animate__fadeInDown'>
                {post.title}
              </div>
            </div>
            <div className='post__item'>
              <div className='post__info'>
                <div className='post__tags'>
                  {post.tags.map((tag) => (
                    <div
                      key={tag.id}
                      className='post__tag animate__animated animate__fadeInDown'
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className='post__preview animate__animated animate__fadeInUpBig'>
                {post.excerpt}
              </div>
              <div className='post__read animate__animated animate__flipInX'>
                {'LEER POST >'}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </article>
  );
}

export default PostItem;
