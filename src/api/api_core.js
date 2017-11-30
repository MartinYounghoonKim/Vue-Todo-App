import axios from 'axios';

const todoApi = axios.create({
    baseURL: 'http://localhost:2403/todos',
    timeout: 1000,
    responseType: 'json'
});

export default todoApi;