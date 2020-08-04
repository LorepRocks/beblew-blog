import React from 'react';
import '../styles/shared.css';
import Api from '../Api';
class Search extends React.Component {
  constructor(props) {
    console.log('___search props', props);
    super();
    this.state = {
      tags: [],
      postByTag: [],
    };
  }
  componentDidMount() {
    this.api = new Api();
    this.getTags();
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
  handleOnTagClick = (e) => {
    console.log('__selected tag', e.target.id);
    const tagSlug = e.target.id;
    this.getPostByTags(tagSlug);
  };

  getPostByTags = async (tagSlug) => {
    await this.api.getPostsByTag(tagSlug).then((posts) => {
      console.log(posts);
      this.setState({
        postByTag: posts,
      });
    });
  };
  render() {
    return (
      <div className={`search-container ${this.props.addClass}`}>
        <div onClick={this.props.onClose} className='close'></div>
        <div className='search-input-container'>
          <input className='search-input' placeholder='Buscar un post...' />
        </div>
        <div className='search-results'>
          <ul onClick={this.handleOnTagClick} className='search-tags-container'>
            {this.state.tags.map((tag) => (
              <li className='search-tags-item' key={tag.id} id={tag.slug}>
                {tag.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Search;
