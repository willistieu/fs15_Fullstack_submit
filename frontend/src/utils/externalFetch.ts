import axios from "axios";

export const dataInstance = axios.create({
    baseURL: 'https://localhost:7092/'
})