import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, LOADING_COMMENT } from '../types'

const initialState = {
    loading: false,
    loadingComments: false,
    emailerror: null,
    passworderror: null,
    error: null,

};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ERRORS:

            let error = action.payload;
            if (action.payload.search("no user") !== -1) {
                error = 'user or password invalid';
                return {
                    initialState,
                    emailerror: error,
                    loading: false
                }
            } else if (action.payload.search("password is invalid") !== -1) {

                error = 'password invalid';
                return {
                    initialState,
                    passworderror: error,
                    loading: false
                }
            } else {
                return {
                    ...state,
                    error: error,
                    loading: false
                }
            }


        case CLEAR_ERRORS:
            return {
                initialState
            }
        case LOADING_UI:
            return {
                ...state,
                loading: true,
            }
        case LOADING_COMMENT:
            return {
                ...state,
                loadingComment: true,
            }
        default:
            return state;
    }
}
