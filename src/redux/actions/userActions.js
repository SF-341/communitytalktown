import { SET_USER, SET_USER_REFRESH, SET_UNAUTHENTICATION, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_USER_UPDATE } from '../types';
import firebaseConfig, { firestore } from '../../config'


export const loginUser = (userData) => (dispatch) => {
    dispatch({ type: LOADING_UI })

    const refUser = firestore.collection("User");


    firebaseConfig
        .auth()
        .signInWithEmailAndPassword(userData.email, userData.password).then((data) => {
            console.log(data.user.providerData[0].email);
            refUser.onSnapshot(querySnapshot => {
                const ListSnapshot = querySnapshot.docs;
                ListSnapshot.forEach(doc => {
                    if (doc.data().email === data.user.providerData[0].email) {
                        localStorage.setItem('IdToken', doc.id);
                        dispatch(getUserData());
                        dispatch({ type: CLEAR_ERRORS });
                    }
                });

            })
        }).catch((error) => {
            dispatch({ type: SET_ERRORS, payload: error.message })
            console.log(error.message);
        })



}


export const register = (newUser, user) => (dispatch) => {
    dispatch({ type: LOADING_UI })

    const refUser = firebaseConfig.firestore().collection("User");


    firebaseConfig.auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(() => {
            localStorage.setItem('IdToken', newUser.id);
            refUser.doc(newUser.id)
                .set(newUser)
        }).then(() => {
            dispatch(getUserData());
            dispatch({type: CLEAR_ERRORS});
        })
        .catch((error) => {
            dispatch({
                type: SET_ERRORS,
                payload: error.message
            })
            console.log(error.message);
        })
}


export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_UI })

    const IdToken = localStorage.getItem('IdToken');
    const documentRef = firestore.doc("User/" + IdToken);

    documentRef.get().then(documentSnapshot => {
        let data = documentSnapshot.data();
        dispatch({
            type: SET_USER,
            payload: data
        })
        dispatch({
            type: CLEAR_ERRORS
        });
    }).catch((error) => {
        dispatch({ type: SET_ERRORS, payload: error.message });
        console.log(error.message);
    })



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

    firebaseConfig.auth().signOut().then(() => {
        dispatch({ type: SET_UNAUTHENTICATION });
        localStorage.clear();
        dispatch({ type: CLEAR_ERRORS });
    }).catch((error) => {
        dispatch({ type: SET_ERRORS, payload: error.message });
        console.log(error.message);
    })



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
