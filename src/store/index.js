import Vue from "vue";
import Vuex from "vuex";
import api from "./api";
import VuexPersistence from "vuex-persist";
Vue.use(Vuex);
const vuexLocal = new VuexPersistence({
    storage: window.sessionStorage
});

export default new Vuex.Store({
    state: {
        UserData: null,
        AllGroups: [],
        MyGroups: [],
        StudentGroups: [],
        GroupPosts: [],
        CurrentGroup: null,
        CurrentPost: null,
        PostReplies: []
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
        },
        getStudentGroups(state) {
            return state.StudentGroups;
        },
        getGroupPosts(state) {
            return state.GroupPosts;
        },
        getCurrentGroup(state) {
            return state.CurrentGroup;
        },
        getCurrentPost(state) {
            return state.CurrentPost
        },
        getPostReplies(state) {
            return state.PostReplies
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
        },
        setStudentGroups(state, studentGroups) {
            state.StudentGroups = studentGroups;
        },
        setGroupPosts(state, posts) {
            state.GroupPosts = posts;
        },
        setCurrentGroup(state, currentGroup) {
            state.CurrentGroup = currentGroup;
        },
        clearUserData(state) {
            state.UserData = {}
            state.AllGroups = []
            state.MyGroups = []
            state.StudentGroups = []
            state.GroupPosts = []
            state.CurrentGroup = null
            sessionStorage.clear();
        },
        clearGroupPosts(state) {
            state.GroupPosts = []
        },
        setCurrentPost(state, post) {
            state.CurrentPost = post
        },
        clearCurrentPost(state) {
            state.CurrentPost = null
        },
        setPostReplies(state, replies) {
            state.PostReplies = replies
        },
        clearPostReplies(state) {
            state.PostReplies = []
        }
    },
    actions: {
        async fetchAllGroups(context) {
            await api()
                .get("/groups/getAllGroups")
                .then(res => {
                    if (res.data.status == "sucess")
                        context.commit("setAllGroups", res.data.data);
                })
                .catch(() => {});
        },
        async fetchMyGroups(context) {
            var user_id = context.getters.getUserData.id;
            await api()
                .get(
                    `/groups/getAllGroupByCreator/${user_id}`
                )
                .then(res => {
                    if (res.data.status == "success") {
                        context.commit("setMyGroups", res.data.data);
                    }
                });
        },
        async fetchStudentGroups(context) {
            var user_id = context.getters.getUserData.id;
            await api()
                .get(`/groups/getAllGroupByUser/${user_id}`)
                .then(res => {
                    if (res.data.status == "success") {
                        context.commit("setStudentGroups", res.data.data);
                    }
                });
        },
        async fetchGroupPosts(context, group_id) {
            var user_id = context.getters.getUserData.id;
            await api()
                .get(
                    `/posts/getGroupPosts/${user_id}/${group_id}`
                )
                .then(res => {
                    if (res.data.status == "success") {
                        context.commit("setGroupPosts", res.data.data);
                    }
                });
        },
        async fetchPostReplies(context) {
            var user_id = context.getters.getUserData.id;
            var post_id = context.getters.getCurrentPost._id;
            await api()
                .get(
                    `/replies/getAllReplies/${user_id}/${post_id}`
                )
                .then(res => {
                    if (res.data.status == "success") {
                        context.commit("setPostReplies", res.data.data);
                    }
                });
        }
    },
    plugins: [vuexLocal.plugin]
});