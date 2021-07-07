import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        users: [],
        posts: [],
        user: null,
        students: [],
    },
    mutations: {
        SET_POSTS(state, data) {
            state.posts = data.map(d => {
                const user = state.users.find(user => user.id === d.userId)
                if (!user || !d) return
                return {
                    ...d,
                    username: user.username,
                    name: `${user.name} ${user.surname}`
                }
            });
        },
        SET_USERS(state, users) {
            state.users = users;
        },
        SET_USER(state, user) {
            state.user = user;
        },
        SET_STUDENTS(state, students) {
            state.students = students
        }
    },
    actions: {
        createUser({ dispatch }, payload) {
            return Vue.axios.post("/user", payload)
                .then(res => dispatch('fetchUser', res.data));
        },
        fetchUser({ commit }, id) {
            return Vue.axios.get(`/user/${id}`)
                .then(res => {
                    commit('SET_USER', res.data)
                })
        },
        fetchUsers({ commit }) {
            return Vue.axios.get(`/user`)
                .then(res => {
                    commit('SET_USERS', res.data);
                    return res.data
                });
        },

        createPost({ dispatch }, payload) {
            return Vue.axios.post(`/post`, payload)
                .then(() => {
                    return dispatch('fetchPosts')
                });
        },
        fetchPosts({ commit }) {
            return Vue.axios.get(`/post`).then(res => {
                commit('SET_POSTS', res.data);
            })
        },
        deletePost({ dispatch }, id) {
            return Vue.axios.delete(`/post/${id}`)
                .then(() => dispatch('fetchPosts'))
        },
        createStudent({ dispatch }, payload) {
            return Vue.axios.post("/student", payload).then(() => {
                return dispatch('fetchStudents')
            })
        },
        fetchStudents({ commit }) {
            return Vue.axios.get(`/student`)
                .then(res => {
                    commit('SET_STUDENTS', res.data);
                    return res.data
                });
        },
        deleteStudent({ dispatch }, id) {
            return Vue.axios.delete(`/student/${id}`)
                .then(() => dispatch('fetchStudents'))
        },
        updateStudent({ dispatch }, payload) {
            let { id } = payload
            return Vue.axios.put(`/student/${id}`, payload)
                .then(() => dispatch('fetchStudents'))
        }


    },
    getters: {
        getPosts(state) {
            return state.posts
        },
        getUsers(state) {
            return state.users
        },
        getUser(state) {
            return state.user
        },
        getStudents(state) {
            return state.students
        }
    },
})

export default store