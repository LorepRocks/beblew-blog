import React, { useEffect } from 'react';
import '../styles/shared.css';
import SearchResult from '../components/SearchResult';

import Api from '../Api';
function Search(props) {
  const [tags, setTags] = React.useState([]);
  const [postByTag, setPostByTag] = React.useState([]);
  const [filteredPosts, setFilteredPost] = React.useState([]);
  const [selectedTag, setTagSelected] = React.useState('');
  const api = new Api();

  useEffect(() => {
    getTags();
    /* FIXME: should exist a better way to ensure don't allow scroll on search modal without add position to body */
    document.body.style.position = 'fixed';
  }, []);

  async function getTags() {
    await api.getTags().then((tags) => {
      setTags(tags);
    });
  }
  async function handleOnTagClick(e) {
    const tagSlug = e.target.id;
    setTagSelected(tagSlug);
    await api.getPostsByTag(tagSlug).then((posts) => {
      setPostByTag(posts);
    });
  }
  function handleOnCleanClick(e) {
    setPostByTag([]);
    setTagSelected('');
  }

  async function handleChangeText(e) {
    let query = e.target.value;
    const regex = /^ *$/g;
    setFilteredPost([]);
    setPostByTag([]);

    if (query !== '' && !regex.test(query)) {
      let filter = props.posts.filter((post) => {
        return post.title.toLowerCase().includes(query.toLowerCase());
      });
      setFilteredPost(filter);
    }
  }

  return (
    <div className={`search-container ${props.addClass}`}>
      <div onClick={props.onClose} className='close'></div>
      <div className='search-input-container'>
        {postByTag.length > 0 && (
          <button onClick={handleOnCleanClick} className='btn-clear-search'>
            X {selectedTag.replace('-', ' ').toUpperCase()}
          </button>
        )}
        <input
          onChange={handleChangeText}
          className='search-input'
          placeholder='Buscar un post...'
        />
      </div>
      {postByTag.length === 0 && filteredPosts.length === 0 && (
        <div className='search-results'>
          <ul onClick={handleOnTagClick} className='search-tags-container'>
            {tags.map((tag) => (
              <li className='search-tags-item' key={tag.id} id={tag.slug}>
                {tag.name}
              </li>
            ))}
          </ul>
          <div className='tags-msg'>Puedes selecionar un tag para filtrar</div>
          <div className='result-count'>0 Post Encontrados</div>
        </div>
      )}
      {postByTag.length > 0 && filteredPosts.length === 0 && (
        <SearchResult posts={postByTag} onClose={props.onClose} />
      )}
      {filteredPosts.length > 0 && (
        <SearchResult posts={filteredPosts} onClose={props.onClose} />
      )}
    </div>
  );
}

export default Search;
