import { GET_POSTS, LOADING, ERROR, GET_POST, GET_RECOMMENDED_POST, GET_TAGS, GET_POSTS_BY_TAG } from '../types/postsTypes';

const INITIAL_STATE={
    posts: [],
    loading: false,
    error: null,
    post: {},
    recommendedPosts: [],
    tags: [], 
    postsByTag: []
}

export default (state = INITIAL_STATE, action) => {
        switch(action.type){
            case GET_POSTS:
                return {...state,
                        posts: action.payload,
                        loading: false
                    };
            case GET_POST: 
                    return {
                        ...state,
                        post: action.payload,
                        loading: false
                    };
            case GET_RECOMMENDED_POST: 
                    return {
                        ...state,
                        recommendedPosts: action.payload,
                        loading: false
                    }
            case GET_TAGS:
                 return {
                     ...state,
                     tags: action.payload,
                     loading: false
                 }
            case GET_POSTS_BY_TAG: 
                 return {
                     ...state,
                     postsByTag: action.payload,
                     loading: false
                 }
            case LOADING:
                return { ...state , loading: true};
            case ERROR: 
                return {...state, error: action.payload, loading: false}

            default: return state;
        }
}