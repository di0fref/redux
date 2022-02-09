import axios from "axios";
import {apiConfig} from "../config/config";

const http = axios.create({
    baseURL: apiConfig.url,
    headers: {
        "Content-type": "application/json",
    },
});

http.interceptors.request.use(function (config) {
    config.headers.token = localStorage.getItem("api_token")
    return config;
}, function (error) {
    return Promise.reject(error);
});

http.interceptors.response.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default http;



