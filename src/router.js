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
                import ("./components/Sessions/Login.vue")
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
                import ("./components/Sessions/ForgotPassword.vue")
        },
        {
            path: "/registration",
            component: () =>
                import ("./components/Sessions/Registration.vue")
        },
        {
            path: "/resetPassword/:resetToken",
            props: true,
            component: () =>
                import ("./components/Sessions/PasswordReset.vue")
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
            if (to.path == '/forgot' || to.path == '/registration' || to.fullPath.includes("/resetPassword"))
                next();
            else
                next("/login");
        }

    }
    next();
});

export default router;