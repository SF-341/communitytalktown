import { SET_USER, SET_UNAUTHENTICATION, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';
import firebaseConfig, { firestore } from '../../config'


export const loginUser = (userData) => (dispatch) => {

    dispatch({ type: LOADING_UI })
    try {
        firebaseConfig
            .auth()
            .signInWithEmailAndPassword(userData.email, userData.password)
    } catch (error) {
        console.log(error.message);
    }

    const refUser = firestore.collection("User");

    try {
        refUser.onSnapshot(querySnapshot => {
            const ListSnapshot = querySnapshot.docs;
            ListSnapshot.forEach(doc => {
                if (doc.data().email === userData.email) {
                    localStorage.setItem('IdToken', doc.id);
                }
            });
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
        })
    } catch (error) {
        dispatch({ type: SET_ERRORS, payload: error.message })
        console.log(error.message);
    }
}

export const getUserData = () => (dispatch) => {
    const IdToken = localStorage.getItem('IdToken');
    const documentRef = firestore.doc("User/" + IdToken);
    try {
        documentRef.get().then(documentSnapshot => {
            let data = documentSnapshot.data();
            console.log(data);
            dispatch({
                type: SET_USER,
                payload: data
            })
        });
    } catch (error) {
        dispatch({ type: SET_ERRORS, payload: error.message });
        console.log(error.message);
    }
}

export const refreshUserData = () => (dispatch) => {
    dispatch(getUserData());
}

export const logoutUser = () => (dispatch) => {
    dispatch({ type: LOADING_UI });
    try {
        firebaseConfig.auth().signOut().then(() => {
            dispatch({ type: SET_UNAUTHENTICATION });
            localStorage.clear();
            dispatch({ type: CLEAR_ERRORS });
        });
    } catch (error) {
        dispatch({ type: SET_ERRORS, payload: error.message });
        console.log(error.message);
    }
}

export const updateUser = () => (dispatch) => {
    
}
