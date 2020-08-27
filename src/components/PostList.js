import React from 'react';
import PostItem from './PostItem';
import Loading from './Loading';
import Footer from './Footer';
import Error from './Error';
import '../styles/index.css';
import '../styles/shared.css';
import Api from '../Api';

class PostList extends React.Component {
  state = {
    loading: true,
    error: null,
    data: [],
  };

  componentDidMount() {
    this.api = new Api();
    this.fetchPosts();
  }

  fetchPosts = async () => {
    this.setState({ loading: true });

    await this.api
      .getPosts()
      .then((posts) => {
        this.setState({
          loading: false,
          data: posts,
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
    if (this.state.error) {
      return <Error />;
    }
    if (!this.state.loading) {
      return (
        <React.Fragment>
          <section>
            <main>
              {this.state.data.map((post) => (
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

export default PostList;
