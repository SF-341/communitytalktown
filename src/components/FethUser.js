import { useReducer, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import firebaseConfig, { firestore } from '../config'
import { AuthContext } from './Auth'

const initialState = {
    loading: "",
    id: "",
    data: null,
}

function apiUser(state, action) {
    switch (action.type) {
        case "DATA_FETCH_START":
            return { ...state, loading: false };
        case "DATA_FETCH_ID":
            return { ...state, loading: false, id: action.payload };
        case "DATA_FETCH_SUCCESS":
            return { ...state, loading: true, data: action.payload };
        default:
            return state;
    }
}

export default function FethUser() {
    const { currentUser } = useContext(AuthContext);
    const [data, dispatch] = useReducer(apiUser, initialState);
    const Auth = firebaseConfig.auth();
    const user = Auth.currentUser;

    const refUser = firestore.collection("User");

    useEffect(() => {
        if (currentUser) {
            dispatch({ type: "DATA_FETCH_START" });
            refUser.onSnapshot(querySnapshot => {
                const ListSnapshot = querySnapshot.docs;
                ListSnapshot.forEach(doc => {
                    if (doc.data().email === user.email) {
                        dispatch({ type: "DATA_FETCH_ID", payload: doc.id });
                        dispatch({ type: "DATA_FETCH_SUCCESS", payload: doc.data() });
                    }
                });
            })
        }

    }, [])

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    return data;
}
