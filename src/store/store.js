import { firebaseAuth, firebaseDb } from 'boot/firebase'

const state = {
    userDetails: {}
}

const mutations = {
    setUserDetails(state, payload) {
        state.userDetails = payload;
    }
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

    },
    handleAuthStateChanged({ commit }) {
        console.log('handleAuthStateChanged');
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                // User is logged in.
                let userId = firebaseAuth.currentUser.uid;
                firebaseDb.ref('users/' + userId).once('value', snapshot => {
                    console.log('snapshot:', snapshot);
                    let userDetails = snapshot.val();
                    commit('setUserDetails', {
                        name: userDetails.name,
                        email: userDetails.email,
                        userId: userDetails.userId,
                    })
                })
            } else {
                // User is logged out.
            }
        });
    },
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