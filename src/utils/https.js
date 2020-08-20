/*
 * @Author: your name
 * @Date: 2020-08-04 10:12:48
 * @LastEditTime: 2020-08-07 17:48:13
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \live _tianjin\src\utils\https.js
 */
import axios from "axios";
import qs from "qs";

axios.defaults.timeout = 5000; //响应时间
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8"; //配置请求头
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';        //配置请求头
axios.defaults.baseURL = ""; //配置接口地址
//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
    (config) => {
        let token = sessionStorage.getItem("Authorization");
        if (Object.prototype.hasOwnProperty.call(config.headers, "Authorization") && token) {
            config.headers.Authorization = token;
        }
        //在发送请求之前做某件事
        if (config.method === "post") {
            config.data = qs.stringify(config.data);
        }
        return config;
    },
    (error) => {
        console.log("错误的传参");
        return Promise.reject(error);
    }
);

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
    (res) => {
        // console.log('res :>> ', res);
        //对响应数据做些事
        if (!res.data.success) {
            return Promise.resolve(res);
        }
        return res;
    },
    (error) => {
        console.log("error :>> ", error);
        console.log("网络异常");
        return Promise.reject(error);
    }
);

//返回一个Promise(发送post请求)
export function fetchPost(url, params, header) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, params, header)
            .then(
                (response) => {
                    resolve(response);
                },
                (err) => {
                    reject(err);
                }
            )
            .catch((error) => {
                reject(error);
            });
    });
}
////返回一个Promise(发送get请求)
export function fetchGet(url, param) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, { params: param })
            .then(
                (response) => {
                    resolve(response);
                },
                (err) => {
                    reject(err);
                }
            )
            .catch((error) => {
                reject(error);
            });
    });
}
export default {
    fetchPost,
    fetchGet
};
