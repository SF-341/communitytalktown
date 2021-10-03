import { SET_USER_UPDATE_PROFILE, NEW_COMMENT, DELETE_COMMENT, SET_USER, SET_USER_REFRESH, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATION, SET_UNAUTHENTICATION, UNLIKE_POST, LIKE_POST, SET_USER_LOADDING, SET_USER_UPDATE } from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    likes: [],
    comments: [],

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

        case NEW_COMMENT:
            return {
                ...state,
                loading: false,
                comments: [
                    ...state.comments,
                    {
                        commentid: action.payload.commentid,
                        postid: action.payload.id,
                    }
                ]
            }
        case DELETE_COMMENT:
            let updateComments = state.comments.filter((comment) => comment.commentid !== action.payload.commentid)
            console.log('upid ' + updateComments, "ccid " + action.payload.commentid)
            return {
                ...state,
                loading: false,
                comments: updateComments,
            }
        case SET_USER_UPDATE_PROFILE:
            return {
                ...state,
                loading: false,
                image: action.payload.url,
            }
        default:
            return state;
    }
}