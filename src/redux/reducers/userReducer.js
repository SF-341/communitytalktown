import { SET_USER, SET_USER_REFRESH, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATION, SET_UNAUTHENTICATION, UNLIKE_POST, LIKE_POST, SET_USER_LOADDING, SET_USER_UPDATE } from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    likes: [],

};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_USER_LOADDING:
            return {
                ...state,
                loading: true,
            }
        case SET_AUTHENTICATION:
            return {
                ...state,
                authenticated: true,
            };
        case SET_UNAUTHENTICATION:
            return {
                initialState
            };
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case SET_USER_REFRESH:
            return {

                authenticated: true,
                loading: false,
                ...action.payload

            };
        case LIKE_POST:
            return {
                ...state,
                loading: false,
                likes: [
                    ...state.likes,
                    {
                        postid: action.payload.id,
                        userid: state.id,
                    }
                ]
            }
        case UNLIKE_POST:

            let updateLikes = state.likes.filter(like => like.postid !== action.payload.id)

            return {
                ...state,
                loading: false,
                likes: updateLikes
            }
        case SET_USER_UPDATE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}