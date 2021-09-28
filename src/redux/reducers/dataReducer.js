import { SET_POSTS, SET_COVID, LOADING_DATA, LIKE_POST, UNLIKE_POST, SET_USER_SELECT, SET_USER_ALLPOSTS, SET_USER_LOCATION } from '../types'

const initialState = {
    posts: [],
    covid: [],
    loading: false,
    showallposts: true,
    showselectposts: false,
    showlocationsposts: false,
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
        case SET_USER_SELECT:
            return{
                ...state,
                loading: false,
                showselectposts: true,
                showallposts: false,
                showlocationsposts: false,
            }
        case SET_USER_ALLPOSTS:
            return{
                ...state,
                loading: false,
                showselectposts: false,
                showallposts: true,
                showlocationsposts: false,
            }
        case SET_USER_LOCATION:
            return{
                ...state,
                loading: false,
                showselectposts: false,
                showallposts: false,
                showlocationsposts: true,
            }


        default:
            return state;
    }
}