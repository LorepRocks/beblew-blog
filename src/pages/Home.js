import React from 'react';
import PostList from '../components/PostList';

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <PostList />
      </React.Fragment>
    );
  }
}

export default Home;
