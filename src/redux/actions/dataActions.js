import { SET_BACKDROP, CREATE_POST, SET_LASTPOST, SET_POSTS_NEXT, DELETE_POST, SET_COVID_RANGE, SET_COVID_WEEKDAY, NEW_COMMENT, DELETE_COMMENT, SET_POSTS, SET_POSTS_DATA, SET_COVID, LOADING_UI, CLEAR_ERRORS, SET_ERRORS, SET_USER_SELECT, SET_USER_ALLPOSTS, SET_USER_LOCATION, SET_COMMENT } from '../types';
import { firestore, storage } from '../../config'


// query post from database limit 3 post
export const getPosts = () => (dispatch) => {
    dispatch({ type: LOADING_UI });
    const postsRef = firestore.collection("Posts").orderBy("createAt", "desc").limit(3);
    postsRef.get().then(querySnapshot => {
        const List = [];
        const ListSnapshot = querySnapshot.docs;
        ListSnapshot.forEach(function (doc) {
            const data = doc.data()
            List.push(
                data
            );
        });
        dispatch({ type: SET_LASTPOST, payload: List[List.length - 1] })
        dispatch({ type: SET_POSTS, payload: List })
        dispatch({ type: CLEAR_ERRORS });
    }
    );
}

// query next post from database
export const getNextPosts = (lastdoc) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    const postsRef = firestore.collection("Posts").orderBy("createAt", "desc").limit(3).startAfter(lastdoc.createAt);
    postsRef.get().then(querySnapshot => {
        const List = [];
        const ListSnapshot = querySnapshot.docs;
        ListSnapshot.forEach(function (doc) {
            const data = doc.data()
            List.push(
                data
            );
        });
        dispatch({ type: SET_LASTPOST, payload: List[List.length - 1] })
        dispatch({ type: SET_POSTS_NEXT, payload: List })
        dispatch({ type: CLEAR_ERRORS });
    }
    );
}

// query post from database
export const getPost = (docId) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    const documentRef = firestore.doc("Posts/" + docId);
    documentRef.get().then(documentSnapshot => {
        const data = documentSnapshot.data();
        dispatch({ type: SET_POSTS_DATA, payload: data });
        dispatch({ type: CLEAR_ERRORS });
    })
}

// get covid api
export const getCovid = () => (dispatch) => {
    dispatch({ type: LOADING_UI });
    fetch("https://covid19.ddc.moph.go.th/api/Cases/today-cases-all")
        .then((response) => response.json())
        .then(result => {
            dispatch({ type: SET_COVID, payload: result });
            dispatch({ type: CLEAR_ERRORS });

        }).catch((error) => {
            dispatch({ type: SET_ERRORS, payload: "Cannot get covid data" })
        })
}

// get covid api
export const getCovidWeekday = () => (dispatch) => {
    dispatch({ type: LOADING_UI });
    fetch("https://covid19.ddc.moph.go.th/api/Cases/timeline-cases-all")
        .then((response) => response.json())
        .then(result => {
            const list = [];
            for (let i = 1; i < 8; i++) {
                list.push(result[result.length - i])
            }

            dispatch({ type: SET_COVID_WEEKDAY, payload: list });
            dispatch({ type: CLEAR_ERRORS });

        }).catch((error) => {
            dispatch({ type: SET_ERRORS, payload: "Cannot get covid data" })
        })
}

// get covid api
export const getCovidRanges = () => (dispatch) => {
    dispatch({ type: LOADING_UI });
    fetch("https://covidapi.wonyus.repl.co/range")
        .then((response) => response.json())
        .then(result => {
            const list = [];

            list.push({ 'name': '<15', 'uv': result['<15'], 'pv': (result['<15']), 'fill': '#8884d8' })
            list.push({ 'name': '15-29', 'uv': result['15-29'], 'pv': (result['15-29']), 'fill': '#83a6ed' })
            list.push({ 'name': '30-49', 'uv': result['30-49'], 'pv': (result['30-49']), 'fill': '#8dd1e1' })
            list.push({ 'name': '50-69', 'uv': result['50-69'], 'pv': (result['50-69']), 'fill': '#82ca9d' })
            list.push({ 'name': '>70', 'uv': result['>70'], 'pv': (result['>70']), 'fill': '#a4de6c' })
            list.push({ 'name': 'unknow', 'uv': result['unknow'], 'pv': (result['unknow']), 'fill': '#d0ed57' })

            dispatch({ type: SET_COVID_RANGE, payload: list });
            dispatch({ type: CLEAR_ERRORS });

        }).catch((error) => {
            dispatch({ type: SET_ERRORS, payload: "Cannot get covid data" })

        })
}


//create post
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
            });
            newPost.image = Url;
        }
        dispatch({ type: CREATE_POST, payload: newPost })
        await refPost
            .doc(newPost.id)
            .set(newPost)
            .then(() => { dispatch({ type: CLEAR_ERRORS }) })
            .catch((error) => {
                dispatch({ type: SET_ERRORS, payload: error.message })
            });
    }
}

//delete post
export const deletePost = (postId) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    const documentRef = firestore.doc("Posts/" + postId);
    documentRef.delete();
    dispatch({ type: DELETE_POST, payload: { id: postId } });
    dispatch({ type: CLEAR_ERRORS })
}

//create comment
export const createComment = (newComment) => async (dispatch) => {

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
            })
    }
}

//delete comment
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
        })
}

//get comment
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

            dispatch({ type: SET_COMMENT, payload: comments })

            dispatch({ type: CLEAR_ERRORS });

        }


    }

    )
}

// set open back drop
export const setbackdrop = (val) => (dispatch) => {
    dispatch({ type: SET_BACKDROP, payload: val});
}

// set show all post
export const allposts = () => (dispatch) => {
    dispatch({ type: LOADING_UI });
    dispatch({ type: SET_USER_ALLPOSTS })
    dispatch({ type: CLEAR_ERRORS });
}

// set show select post
export const selectposts = (province) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    dispatch({ type: SET_USER_SELECT, payload: province })
    dispatch({ type: CLEAR_ERRORS });
}

// set show from location
export const locationposts = () => (dispatch) => {
    dispatch({ type: LOADING_UI });
    dispatch({ type: SET_USER_LOCATION })
    dispatch({ type: CLEAR_ERRORS });
}

