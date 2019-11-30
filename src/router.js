import Vue from "vue";
import Router from "vue-router";
import DefaultLayout from "./layouts/Default.vue";
import Home from "./views/Home.vue";
import About from "./views/About.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [{
            path: "/",
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