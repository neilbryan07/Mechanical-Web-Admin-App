import axios from 'axios'
import { pageRoutes } from '../contants/index';

const api = 'https://ice-api1.com/';
// const localToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDExOWNlNzVjNjBhNzIxZGNhZThlZiIsInJvbGUiOjEsImlhdCI6MTY5NDU3OTYyMywiZXhwIjoxNjk1MTg0NDIzfQ.P-v9_00OZI7LBZ-DJ_yTxkMzpu4Tc0ytl2722YrJtIY';

const clearAccessToken = () => {
    localStorage.removeItem('access_token');
};

axios.defaults.baseURL = api;

axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access_token');
        if (token) {
            // console.log('Authorization', token)
            config.headers['x-access-token'] = token;
        }
        config.headers['Access-Control-Allow-Headers'] = '*';
        config.headers['Access-Control-Allow-Headers'] = 'POST, GET, PUT, OPTIONS, DELETE';
        config.headers['Access-Control-Allow-Headers'] = 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type';
        config.headers['Accept'] = 'application/x-www-form-urlencoded';
        config.headers['Content-Type'] = 'multipart/form-data';
        return config;
    },
    error => {
        Promise.reject(error)
    });

axios.interceptors.response.use((response) => {
    return response
}, function (error) {
    if (error.response && error.response.status === 401) {
        clearAccessToken();
        return Promise.reject(error);
    }
    if (error.response && error.response.status === 403) {
        // LocalStorageService.clearToken();
        clearAccessToken();
        window.location.href = pageRoutes.LOGIN;

        return Promise.reject(error);
    }
    return Promise.reject(error);
});
