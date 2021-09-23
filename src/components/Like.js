import React, { useState, useContext } from 'react'
import firebaseConfig, { firestore, storage } from '../config'
import GetUser from './GetUserprofile'





const Liked = (postId) => {
    var isEqual = require('lodash.isequal');
    console.log(postId);
    const [check, setCheck] = useState();
    var isEqual = require('lodash.isequal');
    const userRef = firestore.doc("User/" + GetUser.id);


    userRef.get().then(userSnapshot => {
        let data = userSnapshot.data();
        let data1 = data.likepost;
        // console.log(data1);
        for (let i in data1) {
            // console.log(data1[1], postId)
            // console.log(isEqual(data1[1], postId))
            if (isEqual(data1[i], postId)) {
                setCheck(data1[i])

                break;
            }
        }
    })
    console.log(check, postId);
    
    let qq = isEqual(check, postId)
    console.log(qq);
    if (qq) {
        return qq
    }else{
        return qq;
    }
    
}

const SetLikeid = (postId) => {
    
    const userRef = firestore.doc("User/" + GetUser.id);
    let temp = [];

    userRef.get().then(userSnapshot => {
        let data = userSnapshot.data();
        let data1 = data.likepost;
        console.log(data1 !== []);
        console.log(data1)
        if (data1 !== []) {
            for (let i in data1) {
                temp.push(data[i]);
            }
        }
        temp.push(postId);
        userRef.update({
            likepost: temp,
        })


    })
    return true;
}

const DelLikeid = (postId) => {
    const userRef = firestore.doc("User/" + GetUser.id);
    let temp = [];
    userRef.get().then(userSnapshot => {
        let data = userSnapshot.data();
        let data1 = data.likepost;
        console.log(data1);
        if (data1 !== []) {
            for (let i in data1) {
                temp.push(i);
            }
        }
        temp.splice(temp.indexOf(postId), 1)
        userRef.update({
            likepost: temp,
        })


    })
    return true;
}

export { Liked, SetLikeid, DelLikeid };