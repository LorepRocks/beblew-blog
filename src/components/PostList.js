import React from 'react';
import PostItem from './PostItem';
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
    if (!this.state.loading) {
      return (
        <section>
          <main>
            {this.state.data.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </main>
        </section>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}

export default PostList;
