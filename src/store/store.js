import { firebaseAuth, firebaseDb } from 'boot/firebase'

const state = {

}

const mutations = {

}

const actions = {
    registerUser({ }, payload) {
        firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
            .then((userCredential) => {
                let userId = firebaseAuth.currentUser.uid;
                firebaseDb.ref('users/' + userId).set({
                    name: payload.name,
                    email: payload.email,
                    online: true
                })
            })
            .catch((error) => {
                console.log("Code:", error.code);
                console.log("Message:", error.message);
            });

    },
    loginUser({ }, payload) {
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
            .then((userCredential) => {
                console.log(userCredential);
            })
            .catch((error) => {
                console.log("Code:", error.code);
                console.log("Message:", error.message);
            });

    }
}

const getters = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}