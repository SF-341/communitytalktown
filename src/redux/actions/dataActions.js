import { SET_POSTS, SET_POSTS_DATA, SET_COVID, LOADING_UI, CLEAR_ERRORS, SET_ERRORS } from '../types';
import { firestore, storage } from '../../config'


export const getPosts = () => (dispatch) => {
    dispatch({ type: LOADING_UI });
    const postsRef = firestore.collection("Posts").orderBy("createAt", "desc");
    postsRef.onSnapshot(querySnapshot => {
        const List = [];
        const ListSnapshot = querySnapshot.docs;
        ListSnapshot.forEach(function (doc) {
            const data = doc.data()
            List.push(
                data
            );
        });
        dispatch({ type: SET_POSTS, payload: List })
        dispatch({ type: CLEAR_ERRORS });
    }
    );
}

export const deletePost = (id) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    const documentRef = firestore.doc("Posts/" + id);
    documentRef.delete();
    dispatch({ type: CLEAR_ERRORS });
}

export const getPost = (docId) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    const documentRef = firestore.doc("Posts/" + docId);
    documentRef.get().then(documentSnapshot => {
        const data = documentSnapshot.data();
        dispatch({ type: SET_POSTS_DATA, payload: data });
        dispatch({ type: CLEAR_ERRORS });
    })
}

export const getCovid = () => (dispatch) => {
    dispatch({ type: LOADING_UI });
    fetch("https://covid19.ddc.moph.go.th/api/Cases/today-cases-all")
        .then((response) => response.json())
        .then(result => {
            dispatch({ type: SET_COVID, payload: result });
            dispatch({ type: CLEAR_ERRORS });
        }).catch((error) => {
            dispatch({ type: SET_ERRORS, payload: "Cannot get covid data" })
            console.log("Cannot get covid data");
        })
}

export const createPost = (newPost) => async (dispatch) => {
    dispatch({ type: LOADING_UI });
    const refPost = firestore.collection("Posts");
    let Url;
    if (newPost.title.length <= 0 || newPost.details <= 0) {
        dispatch({ type: SET_ERRORS, payload: "title or details are required" })
    } else {
        if (newPost.image !== null) {
            const refImg = storage.ref('images/' + newPost.image.name);
            await refImg.put(newPost.image)
            // Url = newPost.image.name;
            const storageRef = storage.ref().child('images/' + newPost.image.name);
            await storageRef.getDownloadURL().then(async (url) => {
                Url = await url;
                console.log(Url)
            });
            const post = {
                id: newPost.id,
                title: newPost.title,
                details: newPost.details,
                email: newPost.email,
                username: newPost.username,
                image: Url,
                createAt: newPost.createAt,
                likecount: newPost.likecount,
                commentcount: newPost.commentcount
            }
            await refPost
                .doc(post.id)
                .set(post)
                .then(() => { dispatch({ type: CLEAR_ERRORS }) })
                .catch((error) => {
                    dispatch({ type: SET_ERRORS, payload: error.message })
                    console.log(error.message);
                });

        } else {
            refPost
                .doc(newPost.id)
                .set(newPost)
                .then(() => { dispatch({ type: CLEAR_ERRORS }) })
                .catch((error) => {
                    dispatch({ type: SET_ERRORS, payload: error.message })
                    console.log(error);
                });
        }

    }


}