const INITIAL_STATE={
    posts: [],
    loading: true,
    error: null
}

export default (state = INITIAL_STATE, action) => {
        switch(action.type){
            case 'getPosts':
                return {...state,
                        posts: action.payload,
                        error: action.error,
                        loading: false}
            default: return state;
        }
}