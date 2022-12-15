import { SET_USER, SET_USER_REFRESH, SET_UNAUTHENTICATION, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_USER_UPDATE, SET_USER_UPDATE_PROFILE, SET_RESETPASSWORD } from '../types';
import firebaseConfig, { firestore, storage } from '../../config'

// sent feedback
export const sendFeedback = (val) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    const refFeed = firebaseConfig.firestore().collection("Feedback");
    refFeed.add({ "feedback": val });
    dispatch({ type: CLEAR_ERRORS });
}

// sign in 
export const loginUser = (userData) => (dispatch) => {
    dispatch({ type: LOADING_UI })

    const refUser = firestore.collection("User");


    firebaseConfig
        .auth()
        .signInWithEmailAndPassword(userData.email, userData.password).then((data) => {
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

// reset password
export const resetpassword = (email) => (dispatch) => {
    dispatch({ type: LOADING_UI })

    firebaseConfig.auth().sendPasswordResetEmail(email).then(function () {
        console.log('Password Reset Email Sent!');
        dispatch({ type: SET_RESETPASSWORD, payload: true })
        dispatch({ type: CLEAR_ERRORS });

    }).catch(function (error) {
        dispatch({ type: SET_RESETPASSWORD, payload: false })
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/invalid-email') {
            alert(errorMessage);
            dispatch({ type: SET_ERRORS, payload: error.message })
        } else if (errorCode === 'auth/user-not-found') {
            alert(errorMessage);
            dispatch({ type: SET_ERRORS, payload: error.message })
        }
    });

}

// signup
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
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch((error) => {
            dispatch({
                type: SET_ERRORS,
                payload: error.message
            })
            console.log(error.message);
        })
}

// query user data
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

// refresh user data
export const refreshUserData = () => (dispatch) => {
    dispatch({ type: LOADING_UI })

    const IdToken = localStorage.getItem('IdToken');
    const documentRef = firestore.doc("User/" + IdToken);
    try {
        documentRef.get().then(documentSnapshot => {
            let data = documentSnapshot.data();
            dispatch({
                type: SET_USER_REFRESH,
                payload: data
            })
            dispatch({
                type: CLEAR_ERRORS
            });
        });
    } catch (error) {
        dispatch({ type: SET_ERRORS, payload: error.message });
        console.log(error.message);
    }
}

// signout
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

// update user data
export const updateUser = (data) => (dispatch) => {
    const userid = localStorage.IdToken;
    const ref = firestore.doc("User/" + userid);
    try {
        ref.update({ username: data.username, firstname: data.firstname, lastname: data.lastname })
            .then(function () {
                dispatch({ type: SET_USER_UPDATE, payload:  { username: data.username, firstname: data.firstname, lastname: data.lastname }});
            })
    } catch (error) {
        alert(error);
    }
    return true;
}

// update profile user
export const updateUserImage = (img) => async (dispatch) => {
    const userid = localStorage.IdToken;
    const ref = firestore.doc("User/" + userid);

    const refImg = storage.ref('imagesProfile/' + img.name);
    await refImg.put(img)
    // Url = newPost.image.name;
    const storageRef = storage.ref().child('imagesProfile/' + img.name);
    await storageRef.getDownloadURL().then((url) => {
        ref.update({ image: url })
            .then(function () {
                dispatch({ type: SET_USER_UPDATE_PROFILE, payload: { url: url } });
            })

    });

}
