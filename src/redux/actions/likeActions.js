// import { useSelector, useDispatch } from "React-redux";
import { firestore } from '../../config'

import { UNLIKE_POST, LIKE_POST, SET_USER_LOADDING } from '../types'

// save like post to todatabase
export const Like = (postid) => (dispatch) => {
    dispatch({ type: SET_USER_LOADDING })
    let postData;
    let userData;

    const userid = localStorage.getItem("IdToken")
    const refLike = firestore.collection("likes").where('userid', '==', userid).where("postid", '==', postid).limit(1);
    const refDoc = firestore.doc('Posts/' + postid);
    const refUser = firestore.doc('User/' + userid);

    refUser.get().then(doc => {
        userData = doc.data()
        userData.likes.push({ postid, userid })
    })

    refDoc.get().then(doc => {
        if (doc.exists) {
            postData = doc.data()
            return refLike.get()
        } else {
            console.log("Nani can't find doc bro")
        }

    }).then(async data => {
        if (data.empty) {
            await (firestore.collection("likes")
                .add({ userid: userid, postid: postid }));
            postData.likecount++;

            dispatch({ type: LIKE_POST, payload: postData });

            await refDoc.update({ likecount: postData.likecount });
            await refUser.update({ likes: userData.likes });

        } else {
            console.log("liked it!")
        }
    }).catch(error => { console.log(error.message) })
}

// save unlike post to todatabase
export const UnLike = (postid) => (dispatch) => {
    dispatch({ type: SET_USER_LOADDING })
    let userData;
    let postData;

    const userid = localStorage.getItem("IdToken")
    const refLike = firestore.collection("likes").where('userid', '==', userid).where("postid", '==', postid).limit(1);
    const refDoc = firestore.doc('Posts/' + postid)
    const refUser = firestore.doc('User/' + userid);

    refUser.get().then(doc => {
        userData = doc.data()
        let index = userData.likes.findIndex((post) => post.postid === postid);
        userData.likes.splice(index, 1);
    })

    refDoc.get().then(doc => {
        if (doc.exists) {
            postData = doc.data()
            return refLike.get()
        } else {
            console.log("Nani can't find doc bro")
        }
    })
        .then(async (data) => {
            if (data.empty) {
                console.log("unlike it!")
            } else {
                await (
                    firestore.doc('likes/' + data.docs[0].id).delete()
                        .then(() => {
                            postData.likecount--;
                            dispatch({ type: UNLIKE_POST, payload: postData });
                            
                            refDoc.update({ likecount: postData.likecount });
                            refUser.update({ likes: userData.likes });

                        }));

            }
        }).catch(error => { console.log(error.message) })
}


