import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index";

Vue.use(VueRouter);

const routes = [
    {
        path: "",
        redirect: (to) => {
            // const { hash, params, query } = to;
            // console.log("object :>> ", hash, params, query);
            return "/home";
        }
    },
    {
        path: "/home",
        name: "Home",
        component: () => import("../views/Home.vue"),
        meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        }
    }
];
const router = new VueRouter({
    mode: "history", //history模式下，一定要修改base为根部目录下的指定文件
    base: process.env.NODE_ENV === "production" ? "/baidu_yiliao" : "/",
    // base: process.env.BASE_URL,
    routes
});
// console.log("process.env.NODE_ENV :>> ", process.env.BASE_URL);
// 页面刷新时，重新赋值token
if (window.localStorage.getItem("UID")) {
    // store.commit("ACCSEE_TOKEN", sessionStorage.getItem("ACCSEE_TOKEN"));
    // store.commit("REST_TOKEN", sessionStorage.getItem("REST_TOKEN"));
    store.commit("SAVE_UID", localStorage.getItem("UID"));
}

// // 全局路由守卫
// router.beforeEach((to, from, next) => {
//     // const vm = Vue.prototype;
//     if (to.matched.some((record) => record.meta.requireAuth)) {
//         if (to.path == "/home") {
//             if (
//                 store.getters.isLoggedIn &&
//                 localStorage.getItem("UID") &&
//                 store.state.UID
//             ) {
//                 next();
//                 return;
//             }
//             next("/login");
//         }
//     } else {
//         if (
//             !sessionStorage.getItem("ACCSEE_TOKEN") &&
//             !sessionStorage.getItem("REST_TOKEN")
//         ) {
//             const params = "1c81d0b470e441ce85bd90b64907ec42";
//             getToken(params, next);
//         } else {
//             next();
//         }
//         next();
//     }
// });
// async function getToken(params, next) {
//     const token1 = await store.dispatch("getAccseetoken", params);
//     if (token1.data.code === 1) {
//         const obj = {
//             clientName: "1c81d0b470e441ce85bd90b64907ec42",
//             accessToken: token1.data.data
//         };
//         store.dispatch("getResttoken", obj).then((a) => {
//             if (a.data.code === 1) {
//                 store.commit("ACCSEE_TOKEN", token1.data.data);
//                 store.commit("REST_TOKEN", a.data.data);
//                 window.sessionStorage.setItem("ACCSEE_TOKEN", token1.data.data);
//                 window.sessionStorage.setItem("REST_TOKEN", a.data.data);
//                 next();
//             }
//         });
//     }
// }
export default router;
