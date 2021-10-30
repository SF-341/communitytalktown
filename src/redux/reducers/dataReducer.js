import { SET_USER, SET_BACKDROP, SET_LASTPOST, SET_POSTS_NEXT, SET_COVID_RANGE, SET_COVID_WEEKDAY, NEW_COMMENT, DELETE_COMMENT, SET_POSTS, CREATE_POST, DELETE_POST, SET_COVID, LOADING_DATA, LIKE_POST, UNLIKE_POST, SET_USER_SELECT, SET_USER_ALLPOSTS, SET_USER_LOCATION, SET_COMMENT } from '../types'

const initialState = {
    lastdoc: null,
    posts: [],
    covid: [],
    covid_weekday: [],
    covid_range: [],
    comments: [],
    loading: false,
    showallposts: true,
    showselectposts: false,
    showlocationsposts: false,
    backdrop: false,
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
        case SET_LASTPOST:
            return {
                ...state,
                lastdoc: action.payload,
            }
        case SET_POSTS_NEXT:
            return {
                ...state,
                posts: [...state.posts, ...action.payload]
            }
        case CREATE_POST:
            state.posts = [action.payload, ...state.posts];
            return {
                ...state,
            }
        case DELETE_POST:
            let tempPost = state.posts.filter((post) => post.id !== action.payload.id);
            state.posts = [...tempPost];

            return {
                ...state,
            }
        case SET_COVID:
            return {
                ...state,
                covid: action.payload,
                loading: false
            }
        case SET_COVID_WEEKDAY:
            return {
                ...state,
                covid_weekday: action.payload,
                loading: false
            }
        case SET_COVID_RANGE:
            return {
                ...state,
                covid_range: action.payload,
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
            return {
                ...state,
                loading: false,
                showselectposts: true,
                showallposts: false,
                showlocationsposts: false,
            }
        case SET_USER_ALLPOSTS:
            return {
                ...state,
                loading: false,
                showselectposts: false,
                showallposts: true,
                showlocationsposts: false,
            }
        case SET_USER_LOCATION:
            return {
                ...state,
                loading: false,
                showselectposts: false,
                showallposts: false,
                showlocationsposts: true,
            }
        case NEW_COMMENT:
            let indexpost0 = state.posts.findIndex((post) => post.id === action.payload.postdata.id);
            let updatepost0 = action.payload.postdata;
            delete updatepost0.commentid;
            state.posts[indexpost0] = updatepost0;

            const indexcomment = state.comments.findIndex((comment) => comment[0].postid === action.payload.postdata.id);

            if (indexcomment !== -1) {
                let updatecomment = [action.payload.newcomment, ...state.comments[indexcomment]]
                state.comments[indexcomment] = updatecomment
            } else {
                let updatecomment1 = [action.payload.newcomment]
                state.comments.push(updatecomment1);
            }
            return {
                ...state
            }

        case DELETE_COMMENT:
            let indexpost = state.posts.findIndex((post) => post.id === action.payload.postdata.id);
            let updatepost = action.payload.postdata;
            state.posts[indexpost] = updatepost;

            const index1 = state.comments.findIndex((comment) => comment[0].postid === action.payload.postdata.id);
            if (index1 !== -1) {
                let temp = state.comments[index1];
                // const updatecommentdelete = temp.findIndex(comment => comment.id === action.payload.comment.id)

                let updatecomment = temp.filter(comment => comment.id !== action.payload.comment.id);
                if (updatecomment.length <= 0) {
                    state.comments.splice(index1, 1);
                } else {
                    state.comments[index1] = updatecomment;
                }

            }
            return {
                ...state
            }
        case SET_COMMENT:
            return {
                ...state,
                loading: false,
                comments: [...state.comments, action.payload]
            }
        case SET_BACKDROP:
            return {
                ...state,
                backdrop: action.payload,
            }
        case SET_USER:
            return {
                ...state,
                backdrop: false,
            }


        default:
            return state;
    }
}