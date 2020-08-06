import React from 'react';
import '../styles/shared.css';
import SearchResult from '../components/SearchResult';

import Api from '../Api';
class Search extends React.Component {
  constructor(props) {
    console.log('___search props', props);
    super();
    this.state = {
      tags: [],
      postByTag: [],
      searchText: '',
      posts: props.posts,
      filteredPosts: [],
      onClose: props.onSearchClick,
    };
  }
  componentDidMount() {
    this.api = new Api();
    this.getTags();
    document.body.style.position = 'fixed';
  }

  getTags = async () => {
    console.log('____getting tags');
    await this.api.getTags().then((tags) => {
      console.log('__tags', tags);
      this.setState({
        tags: tags,
      });
    });
  };
  handleOnTagClick = async (e) => {
    console.log('__selected tag', e.target.id);
    const tagSlug = e.target.id;
    await this.api.getPostsByTag(tagSlug).then((posts) => {
      console.log(posts);
      this.setState({
        postByTag: posts,
      });
    });
    console.log('___post by tag', this.state.postByTag);
  };

  handleChangeText = (e) => {
    console.log('__text', e.target.value);
    let query = e.target.value;
    const regex = /^ *$/g;
    this.setState({
      filteredPosts: [],
      postByTag: [],
    });
    console.log('_____filtered befre', this.state.filteredPosts);

    if (query !== '' && !regex.test(query)) {
      let filter = this.state.posts.filter((post) => {
        return post.title.toLowerCase().includes(query.toLowerCase());
      });
      this.setState({
        filteredPosts: filter,
      });
      console.log('_____filtered', this.state.filteredPosts);
    }
  };

  render() {
    return (
      <div className={`search-container ${this.props.addClass}`}>
        <div onClick={this.props.onClose} className='close'></div>
        <div className='search-input-container'>
          <input
            onChange={this.handleChangeText}
            className='search-input'
            placeholder='Buscar un post...'
          />
        </div>
        {this.state.postByTag.length === 0 &&
          this.state.filteredPosts.length === 0 && (
            <div className='search-results'>
              <ul
                onClick={this.handleOnTagClick}
                className='search-tags-container'
              >
                {this.state.tags.map((tag) => (
                  <li className='search-tags-item' key={tag.id} id={tag.slug}>
                    {tag.name}
                  </li>
                ))}
              </ul>
              <div className='tags-msg'>
                Puedes selecionar un tag para filtrar
              </div>
              <div className='result-count'>0 Post Encontrados</div>
            </div>
          )}
        {this.state.postByTag.length > 0 &&
          this.state.filteredPosts.length === 0 && (
            <SearchResult
              posts={this.state.postByTag}
              onClose={this.state.onClose}
            />
          )}
        {this.state.filteredPosts.length > 0 && (
          <SearchResult
            posts={this.state.filteredPosts}
            onClose={this.state.onClose}
          />
        )}
      </div>
    );
  }
}

export default Search;
