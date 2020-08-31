import React from 'react';

function Footer(props) {
  return (
    <footer>
      <div className='footer_options'>
        <p>
          Beblew <i className='fa fa-copyright'></i> 2020
        </p>
        <p>
          Síguenos en
          <a
            className='redirect'
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.instagram.com/beblew/'
          >
            <i className='icon-footer fa fa-instagram'></i>
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
