import Vue from "vue";
import Router from "vue-router";
import DefaultLayout from "./layouts/Default.vue";
import Home from "./views/Home.vue";
import About from "./views/About.vue";

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [{
            path: "/",
            alias: '/login',
            component: () =>
                import ("./components/Login.vue")
        },
        {
            path: "/home",
            component: DefaultLayout,
            children: [{
                    path: "",
                    name: "home",
                    component: Home
                },
                {
                    path: "/about",
                    name: "about",
                    component: About
                },
                {
                    path: "/2",
                    name: "view2",
                    component: () =>
                        import ("./components/View2.vue")
                }
            ]
        },
        {
            path: "/1",
            component: () =>
                import ("./components/View1.vue")
        },
        {
            path: "/forgot",
            component: () =>
                import ("./components/ForgotPassword.vue")
        },
        {
            path: "/registration",
            component: () =>
                import ("./components/Registration.vue")
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.fullPath === "/login" || to.fullPath === "/") {
        if (sessionStorage.getItem("token")) {
            next('/home');
        }
    } else {
        if (!sessionStorage.getItem("token")) {

            next("/login");
        }

    }
    next();
});

export default router;