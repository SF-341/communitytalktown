import React, { useState, useEffect } from 'react'
import firebase from "../config";


export default function UserSetting({infinite}) {
  const [User, setUser] = useState([]);
  const [loading, setLoading] = useState(false);



  const ref = firebase.firestore().collection("User");


  function getUser() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setUser(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    getUser();
  }, []);


  const addUser = (newUser) => {
    ref
      .doc(newUser.id)
      .set(newUser)
      .then(console.log(newUser))
      .catch((err) => {
        console.error(err);
      });
      return addUser;
  }

  function deleteUser(user) {
    ref
      .doc(User.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }
  

}


