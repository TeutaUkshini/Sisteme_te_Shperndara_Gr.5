//Krijimi i kycjes se fajllave 
import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/home.vue";
import Dashboard from "@/views/dashboard.vue";
import Students from "@/views/students.vue";
import Teachers from "@/views/teachers.vue";
import ChatRoom from "@/views/ChatRoom.vue";
import Login from "@/views/login/login"
import Signup from "@/views/login/signup"

// import store from '../store'

Vue.use(Router)

const routes = [{
            path: "/",
            name: "login",
            component: Login,
            meta: {
                requiresLogin: false
            },
        },
        {
            path: "/sign-up",
            name: "signup",
            component: Signup,
            meta: {
                requiresLogin: false
            },
        },
        {
            path: "/home",
            name: "home",
            component: Home,
            meta: {
                requiresLogin: true
            },
            redirect: {
                name: "dashboard",
            },
            children: [{
                    path: "/dashboard",
                    name: "dashboard",
                    component: Dashboard,
                    meta: {
                        requiresLogin: true
                    },
                },
                {
                    path: "/students",
                    name: "students",
                    component: Students,
                    meta: {
                        requiresLogin: true
                    },
                },
                {
                    path: "/teachers",
                    name: "teachers",
                    component: Teachers,
                    meta: {
                        requiresLogin: true
                    },
                },
                {
                    path: "/ChatRoom",
                    name: "ChatRoom",
                    component: ChatRoom,
                    meta: {
                        requiresLogin: true
                    },
                },
            ]
        },

        {
            path: "*",
            redirect: "/"
        }
    ]

const router = new Router({
    routes,
    mode: 'history'
})

/*
router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && (!store.state.user && !localStorage.getItem('user'))) {
        next({
            name: 'login'
        })
        return
    } else {
        next()
    }
})*/

export default router
