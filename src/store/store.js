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
    logoutUser() {
        firebaseAuth.signOut();
    },
    handleAuthStateChanged({ commit, dispatch, state }) {
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
                        userId: userId,
                    })
                });
                dispatch('firebaseUpdateUser', {
                    userId: userId,
                    updates: { online: true }
                })
                this.$router.push('/');
            } else {
                // User is logged out.
                dispatch('firebaseUpdateUser', {
                    userId: state.userDetails.userId,
                    updates: { online: false }
                })
                commit('setUserDetails', {});
                this.$router.replace('/auth');
            }
        });
    },
    firebaseUpdateUser({ }, payload) {
        if (payload.userId)
            firebaseDb.ref('users/' + payload.userId).update(payload.updates);
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