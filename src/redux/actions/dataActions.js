import { NEW_COMMENT, DELETE_COMMENT, SET_POSTS, SET_POSTS_DATA, SET_COVID, LOADING_UI, CLEAR_ERRORS, SET_ERRORS, SET_USER_SELECT, SET_USER_ALLPOSTS, SET_USER_LOCATION, LOADING_DATA, SET_COMMENT } from '../types';
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
            newPost.image = Url;
        }

        await refPost
            .doc(newPost.id)
            .set(newPost)
            .then(() => { dispatch({ type: CLEAR_ERRORS }) })
            .catch((error) => {
                dispatch({ type: SET_ERRORS, payload: error.message })
                console.log(error.message);
            });
    }
}

export const deletePost = (id) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    const documentRef = firestore.doc("Posts/" + id);
    documentRef.delete();
    dispatch({ type: CLEAR_ERRORS });
}

export const createComment = (newComment) => async (dispatch) => {
    console.log(newComment)

    let postData;
    let userData;
    let Url;

    const refDoc = firestore.doc('Posts/' + newComment.postid);
    const refUser = firestore.doc("User/" + newComment.userid);
    const refComment = firestore.collection("Comments")


    if (newComment.discribtion.length <= 0) {
        dispatch({ type: SET_ERRORS, payload: "comment is required" });
    } else {
        if (newComment.image !== null) {
            const refImg = storage.ref('comments/' + newComment.image.name);
            await refImg.put(newComment.image)
            const storageRef = storage.ref().child('comments/' + newComment.image.name);
            await storageRef.getDownloadURL().then(async (url) => {
                Url = await url;
            });
            newComment.image = Url;
        }

        await refUser.get().then(doc => {
            userData = doc.data()
            userData.comments.push({
                commentid: newComment.id,
                postid: newComment.postid
            })
        })

        refDoc.get().then(doc => {
            if (doc.exists) {
                postData = doc.data()
                return refComment
            } else {
                console.log("Nani can't find doc bro")
            }
        })
            .then(async () => {

                await refComment
                    .doc(newComment.id)
                    .set(newComment);
                postData.commentcount++;
                dispatch({ type: NEW_COMMENT, payload: { postdata: postData, newcomment: newComment } });
                await (
                    refDoc.update({ commentcount: postData.commentcount }),
                    refUser.update({ comments: userData.comments })
                );
                dispatch({ type: CLEAR_ERRORS });

            }).catch(error => {
                dispatch({ type: SET_ERRORS, payload: error.message })
                console.log(error.message)
            })
    }
}

export const deleteComment = (comment) => (dispatch) => {

    let postData;
    let userData;

    const refDoc = firestore.doc('Posts/' + comment.postid);
    const refUser = firestore.doc("User/" + comment.userid);
    const refComment = firestore.doc('Comments/' + comment.id);

    refUser.get().then(doc => {
        userData = doc.data()
        let index = userData.comments.findIndex((comment) => comment.commentid === comment.id);
        userData.comments.splice(index, 1);
    })

    refDoc.get().then(doc => {
        if (doc.exists) {
            postData = doc.data()
            return refComment.get()
        } else {
            console.log("Nani can't find doc bro")
        }
    })
        .then(async data => {
            if (data.empty) {
                console.log("uncomment")
            } else {
                await firestore.doc('Comments/' + comment.id).delete()
                    .then(() => {
                        postData.commentcount--;
                        dispatch({ type: DELETE_COMMENT, payload: { postdata: postData, comment: comment } });
                        dispatch({ type: CLEAR_ERRORS });
                    })

                return (
                    refDoc.update({ commentcount: postData.commentcount }),
                    refUser.update({ comments: userData.comments })
                );
            }
        }).catch(error => {
            dispatch({ type: SET_ERRORS, payload: error.message })
            console.log(error.message)
        })
}

export const getComment = (postId) => (dispatch) => {
    // dispatch({ type: LOADING_DATA });
    let comments = []
    const refComment = firestore.collection("Comments").where('postid', '==', postId).orderBy("createAt", "desc");

    refComment.get().then(data => {
        if (data.empty) {
            console.log("no comments")


        } else {
            let comment = data.docs;
            comment.forEach(function (doc) {
                const data = doc.data()
                comments.push(
                    data
                );
            });

            console.log(comments);
            dispatch({ type: SET_COMMENT, payload: comments })

            dispatch({ type: CLEAR_ERRORS });

        }


    }

    )
    // .catch(error => {
    //     dispatch({ type: SET_ERRORS, payload: error.message });
    //             console.log(error.message);
    // })
}

export const allposts = () => (dispatch) => {
    dispatch({ type: LOADING_UI });
    dispatch({ type: SET_USER_ALLPOSTS })
    dispatch({ type: CLEAR_ERRORS });
}

export const selectposts = (province) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    dispatch({ type: SET_USER_SELECT, payload: province })
    dispatch({ type: CLEAR_ERRORS });
}

export const locationposts = () => (dispatch) => {
    dispatch({ type: LOADING_UI });
    dispatch({ type: SET_USER_LOCATION })
    dispatch({ type: CLEAR_ERRORS });
}