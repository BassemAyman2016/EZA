import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        UserData: null
    },
    getters: {
        getUserData(state) {
            return state.UserData
        }
    },
    mutations: {
        setUserData(state, data) {
            state.UserData = data
        }
    },
    actions: {

    },
    modules: {}
})