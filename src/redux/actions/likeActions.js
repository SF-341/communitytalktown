import { useSelector, useDispatch } from "React redux";
import { firestore } from '../../config'
import { v4 as uuidv4 } from 'uuid'


export const unLike = (postId) => {
    const userId = localStorage.getItem("IdToken")
    const refLike = firestore.collection("like");
}

export const Like = (postId) => {
    const userId = localStorage.getItem("IdToken")
    const refLike = firestore.collection("like");

}




const addLike = (postId) => {
    const userId = localStorage.getItem("IdToken")
    const refLike = firestore.collection("like").where('userid', '==', userId).where("postid", '==', postId).limit(1);
    const postData;
    const refDoc = firestore.doc('Post/' + postId)
    refDoc.get().then(doc => {
        if(doc.exists){
            postData = doc.data()
            return refLike.get()
        }else{
            console.log("Nani can't find doc bro")
        }

    }).then(data => {
        if(data.empty){
            return(firestore.collection("like")
            .add({userid: userId,postid: postId}))
            .then(() => {
                postData.likecount++
                return(refDoc.update({likecount: postData.likecount}))
            }).then(() => {
                return(postData.json())
            })
        }else{
            console.log("liked it!")
        }
    }).catch(error => {console.log(error.message)})
    
}
const deleteLike = (postId) => {
    const userId = localStorage.getItem("IdToken")
    const refLike = firestore.collection("like").where('userid', '==', userId).where("postid", '==', postId).limit(1);
    const postData;
    const refDoc = firestore.doc('Post/' + postId)
    refDoc.get().then(doc => {
        if(doc.exists){
            postData = doc.data()
            return refLike.get()
        }else{
            console.log("Nani can't find doc bro")
        }

    }).then(data => {
        if(data.empty){
            return(firestore.collection("like")
            .add({userid: userId,postid: postId}))
            .then(() => {
                postData.likecount++
                return(refDoc.update({likecount: postData.likecount}))
            }).then(() => {
                return(postData.json())
            })
        }else{
            console.log("liked it!")
        }
    }).catch(error => {console.log(error.message)})
}


