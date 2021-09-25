import { SET_USER, SET_USER_REFRESH, SET_UNAUTHENTICATION, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_USER_UPDATE } from '../types';
import firebaseConfig, { firestore } from '../../config'


export const loginUser = (userData) => (dispatch) => {
    dispatch({ type: LOADING_UI })

    const refUser = firestore.collection("User");

    try {
        firebaseConfig
            .auth()
            .signInWithEmailAndPassword(userData.email, userData.password)
    
    } catch (error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.message
        })
        console.log(error.message);
    }
    
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
}

export const register = (newUser, user) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    const refUser = firebaseConfig.firestore().collection("User");

    try {
        firebaseConfig.auth()
            .createUserWithEmailAndPassword(user.email, user.password)

    } catch (error) {
        dispatch({ type: SET_ERRORS, payload: error.message })
        console.log(error.message);
    }

    refUser.doc(newUser.id)
        .set(newUser)
        .then(() => localStorage
            .setItem('IdToken', newUser.id))
        .catch((error) => {
            dispatch({ type: SET_ERRORS, payload: error.message })
            console.log(error.message);
        });

    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
}

export const getUserData = () => (dispatch) => {
    const IdToken = localStorage.getItem('IdToken');
    const documentRef = firestore.doc("User/" + IdToken);
    try {
        documentRef.get().then(documentSnapshot => {
            let data = documentSnapshot.data();
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
    const IdToken = localStorage.getItem('IdToken');
    const documentRef = firestore.doc("User/" + IdToken);
    try {
        documentRef.get().then(documentSnapshot => {
            let data = documentSnapshot.data();
            dispatch({
                type: SET_USER_REFRESH,
                payload: data
            })
        });
    } catch (error) {
        dispatch({ type: SET_ERRORS, payload: error.message });
        console.log(error.message);
    }
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

export const updateUser = (data) => (dispatch) => {
    const userid = localStorage.IdToken;
    const ref = firestore.doc("User/" + userid);
    try {
        ref.update({ username: data.username, firstname: data.firstname, lastname: data.lastname })
            .then(function () {
                dispatch({ type: SET_USER_UPDATE });
            })
    } catch (error) {
        alert(error);
    }
    return true;
}
