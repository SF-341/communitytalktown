import {SET_ADDRESS_LOADING, SET_PROVINCES, SET_DISTRICT, SET_SUBDISTRICT, SET_CLEAR_ADDRESS, SET_USER_SELECT} from "../types"

const initialState = {
    loading: false,
    provinces: null,
    district: null,
    subdistrict: null,
    userselect: null,
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_ADDRESS_LOADING:
            return{
                ...state,
                loading: true,
            }
        case SET_PROVINCES:
            return{
                ...state,
                loading: false,
                provinces: action.payload,
            }
        case SET_DISTRICT:
            return{
                ...state,
                loading: false,
                district: action.payload,
            }
        case SET_SUBDISTRICT:
            return{
                ...state,
                loading: false,
                subdistrict: action.payload,
            }
        case SET_CLEAR_ADDRESS:
            return{
                initialState
            }
        case SET_USER_SELECT:
            return{
                ...state,
                loading: false,
                userselect: action.payload,
            }
        default:
            return state;
            
    }
}