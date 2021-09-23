import { SET_USER, SET_REFRESH_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATION, SET_UNAUTHENTICATION } from '../types';

const initialState = {
    authenticated: false,
    like: [],
    
};

export default function(state = initialState, action) {
    switch(action.type){
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
                ...action.payload
            };
        case SET_REFRESH_USER:
            return {
                ...state
            }
        default:
            return state;
    }
}