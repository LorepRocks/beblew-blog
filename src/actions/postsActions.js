import Api from '../Api';
import { GET_POSTS, LOADING, ERROR, GET_POST, GET_RECOMMENDED_POST } from '../types/postsTypes';


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