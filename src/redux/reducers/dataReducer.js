import { SET_POSTS, SET_POSTS_DATA } from '../types'

const initialState = {
    posts: [],
    postsdata: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: [...action.payload]
            }
        case SET_POSTS_DATA:

            const updateState = [...state.postsdata, action.payload]
            return {
                ...state,
                postsdata: updateState
            }
    
        default:
            return state;
    }
}