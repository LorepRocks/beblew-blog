import React from 'react';
import Footer from './Footer';

function Error(props) {
  return (
    <React.Fragment>
      <div className='error-container'>
        <div className='error-info'>
          <i className='error-icon fa fa-frown-o'></i>
          <div className='error-message'>{`Ups! Hubo un error`}</div>
          <button
            onClick={() => window.location.reload()}
            type='button'
            className='error-button'
          >
            Reintentar
          </button>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Error;
