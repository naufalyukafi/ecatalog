import axios from 'axios';

const ApiManager = axios.create({
    baseURL: 'http://35.175.65.185:3000/api/v1',
    responseType: 'json',
    withCredentials: true,
});

export default ApiManager;