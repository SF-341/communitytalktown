import { SET_POSTS, SET_COVID } from '../types'

const initialState = {
    posts: [],
    covid: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: [...action.payload]
            }
        case SET_COVID:
            return {
                ...state,
                covid: action.payload,
            }
    
        default:
            return state;
    }
}