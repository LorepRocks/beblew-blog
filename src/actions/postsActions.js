import Api from '../Api';
import { GET_POSTS, LOADING, ERROR, GET_POST, GET_RECOMMENDED_POST , GET_TAGS, GET_POSTS_BY_TAG, SHOW_SHARE_OPTIONS} from '../types/postsTypes';


const api = new Api();
let error = null;

export const  getPosts = () => async (dispatch) => {

    dispatch({
        type: LOADING
    });

    const posts = await api.getPosts()
      .then((posts) => {
        return posts;
      }).catch((e) => { 
          dispatch({
              type: ERROR,
              payload: e.message
          })
      });

    dispatch({
        type: GET_POSTS,
        payload: posts,
        error: error
    })
}

export const getPost = (slug) => async (dispatch) => {
  dispatch({
    type: LOADING
  });
  const post = await api.getPostBySlug(slug).then(post => {
    return post;
  }).catch( e => {
    dispatch({
      type: ERROR,
      payload: e.message
    })
  });

  dispatch({
    type: GET_POST,
    payload: post
  });

  dispatch({
    type: SHOW_SHARE_OPTIONS,
    payload: true
  });
  
}

export const getRecommendedPosts = (slug) => async(dispatch) => {
  const _ = require('lodash');
  dispatch({
    type: LOADING
  });
  const posts = await api.getPosts()
      .then((posts) => {
        return posts;
      }).catch((e) => { 
          dispatch({
              type: ERROR,
              payload: e.message
          })
      });
      
      let filterPost = posts.filter((post) => post.slug !== slug);
      dispatch({
        type: GET_RECOMMENDED_POST,
        payload: _.sampleSize(filterPost, 2)
      });
   
}

export const getTags = () => async(dispatch) => {
  dispatch({
    type: SHOW_SHARE_OPTIONS,
    payload: false
  });
  const tags = await api.getTags().then((tags) => {
    return tags;
  }).catch((e) => {
    dispatch({
      type: ERROR,
      payload: e.message
    })
  })
  dispatch({
    type: GET_TAGS,
    payload: tags
  })
}

export const getPostsByTag = (tag) => async(dispatch) => {
  const posts = await api.getPostsByTag(tag).then((posts) => {
    return posts;
  }).catch(e => {
    dispatch({
      type: ERROR,
      payload: e.message
    })
  })

  dispatch({
    type: GET_POSTS_BY_TAG,
    payload: posts
  });
}

export const showShareOptions = (value) => (dispatch) => {
  dispatch({
    type: SHOW_SHARE_OPTIONS,
    payload: value
  });
}