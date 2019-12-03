import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VuexPersistence from "vuex-persist";
Vue.use(Vuex);
const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});

export default new Vuex.Store({
    state: {
        UserData: null,
        AllGroups: [],
        MyGroups: []
    },
    getters: {
        getUserData(state) {
            return state.UserData;
        },
        getAllGroups(state) {
            return state.AllGroups;
        },
        getMyGroups(state) {
            return state.MyGroups;
        }
    },
    mutations: {
        setUserData(state, data) {
            state.UserData = data;
        },
        setAllGroups(state, allGroups) {
            state.AllGroups = allGroups;
        },
        setMyGroups(state, myGroups) {
            state.MyGroups = myGroups;
        }
    },
    actions: {
        async fetchAllGroups(context) {
            await axios
                .get("http://localhost:3000/api/groups/getAllGroups")
                .then(res => {
                    if (res.data.status == "sucess")
                        context.commit("setAllGroups", res.data.data);
                })
                .catch(() => {});
        },
        async fetchMyGroups(context) {
            var user_id = context.getters.getUserData.id;
            await axios
                .get(
                    `http://localhost:3000/api/groups/getAllGroupByCreator/${user_id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: sessionStorage.getItem("token")
                        }
                    }
                )
                .then(res => {
                    if (res.data.status == "success") {
                        context.commit("setMyGroups", res.data.data);
                    }
                });
        }
    },
    plugins: [vuexLocal.plugin]
});