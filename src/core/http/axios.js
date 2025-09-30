import axios from "axios";


const baseURL = "https://eleven-code-api-laura-sabiote.vercel.app/api";

export const api = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

