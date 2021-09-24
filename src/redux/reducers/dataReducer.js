import { SET_POSTS, SET_COVID, LOADING_DATA, LIKE_POST, UNLIKE_POST } from '../types'

const initialState = {
    posts: [],
    covid: [],
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true,
            }
        case SET_POSTS:
            return {
                ...state,
                posts: [...action.payload],
                loading: false
            }
        case SET_COVID:
            return {
                ...state,
                covid: action.payload,
                loading: false
            }
        case LIKE_POST:
        case UNLIKE_POST:
            let index = state.posts.findIndex((post) => post.id === action.payload.id);
            state.posts[index] = action.payload;
            return {
                ...state
            }



        default:
            return state;
    }
}