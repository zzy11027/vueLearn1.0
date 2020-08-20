import Vue from "vue";
import Vuex from "vuex";
import https from "@/utils/https.js";

Vue.use(Vuex);
const state = {
    accessToken: "", //TOKEN
    restToken: "", //TOKEN
    UID: "" //UID
};
const getters = {
    getUid: (state) => state.UID,
    isLoggedIn: (state) => !!state.UID
};
const mutations = {
    ACCSEE_TOKEN(state, token) {
        state.accessToken = token;
    },
    REST_TOKEN(state, token) {
        state.restToken = token;
    },
    AUTH_ERROR(state, token) {
        state.restToken = "";
    },
    SAVE_UID(state, id) {
        console.log('id :>> ', id);
        state.UID = id;
    }
};
const actions = {
    //ACCSEE_TOKEN    申请其它token的必要值
    getAccseetoken({ commit }, user) {
        return new Promise((resolve, reject) => {
            https
                .fetchPost(`http://121.36.2.19:8080/token/access/${user}`)
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    //REST_TOKEN    请求数据接口需要的必要值
    getResttoken({ commit }, obj) {
        return new Promise((resolve, reject) => {
            https
                .fetchPost(
                    `http://121.36.2.19:8080/token/rest/${obj.client_name}/${obj.accessToken}`
                )
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    //登录
    Login({ commit }, user) {
        const vm = Vue.prototype;
        return new Promise((resolve, reject) => {
            https
                .fetchPost(`${vm.baseURL.value}login`, user)
                // .fetchPost(`${vm.baseURL.value}apis/user`, user)
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => {
                    commit("AUTH_ERROR");
                    // localStorage.removeItem('token');
                    reject(err);
                });
        });
    }
};
const modules = {};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules
});
export default store;
