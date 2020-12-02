import Api from '../Api';


const api = new Api();
let error = null;

export const  getPosts = () => async (dispatch) => {
    const posts = await api.getPosts()
      .then((posts) => {
        return posts;
      }).catch((e) => { 
          error = e.message;
      })


    dispatch({
        type: 'getPosts',
        payload: posts,
        error: error
    })
}