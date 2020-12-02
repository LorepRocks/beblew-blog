import React from 'react';
import { connect } from 'react-redux';
import * as postsActions from '../actions/postsActions';

import PostItem from './PostItem';
import Loading from './Loading';
import Footer from './Footer';
import Error from './Error';

import '../styles/index.css';
import '../styles/shared.css';


class PostList extends React.Component {
 

  componentDidMount() {
    this.props.getPosts();
  }

  

  render() {
    if (this.props.error) {
      return <Error />;
    }
    if (!this.props.loading) {
      return (
        <React.Fragment>
          <section>
            <main>
              {this.props.posts.map((post) => (
                <PostItem key={post.id} post={post} />
              ))}
            </main>
          </section>
          <Footer />
        </React.Fragment>
      );
    } else {
      return <Loading />;
    }
  }
}

//allow access to reducers from component props
const mapStateToProps = ( reducers ) => {
  return reducers.postsReducer;
}

export default connect(mapStateToProps, postsActions)(PostList);
