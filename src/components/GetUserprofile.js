import firebaseConfig, { firestore } from '../config'

class GetUserprofile {
    constructor() {
        this.Auth = firebaseConfig.auth();
        this.user = this.Auth.currentUser;
        this.id = '';
        this.ListUser = {};
        this.refUser = firestore.collection("User")
        this.userName = "";
    }

    getUserName() {
        return this.userName;
    }


    getUser(Temp) {
        this.refUser.onSnapshot(querySnapshot => {
            const ListSnapshot = querySnapshot.docs;
            ListSnapshot.forEach(doc => {
                if (doc.data().email === Temp) {
                    this.id = doc.id;
                    this.userName = doc.data().username;
                    this.ListUser = doc.data();
                }
            })
        })
    }

    clearUser(){
        this.ListUser = {};
    }
}
export default new GetUserprofile();