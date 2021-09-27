import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer'
import dataReducer from './reducers/dataReducer'
import uiReducer from './reducers/uiReducer'
import addressReducer from './reducers/addressReducer'

const initialState = {

};

const middleware = [thunk];

const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    UI: uiReducer,
    address: addressReducer,
})

const store = createStore(reducers, initialState, compose(applyMiddleware(...middleware),
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "undefined"? a => a
        : window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;