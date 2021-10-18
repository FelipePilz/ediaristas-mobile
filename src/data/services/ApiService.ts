import axios from "axios";

const url = "http://192.168.0.25:8080";

export const ApiService = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin:": "*",
    },
});
