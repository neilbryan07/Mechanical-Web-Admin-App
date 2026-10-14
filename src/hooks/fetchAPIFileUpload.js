import axios from 'axios';
import './axiosFileConfig';

export const APIServicesFileUpload = ( function () {

    function get({ url }) {
        localStorage.setItem('file_token', true)
        return axios.get( url )
            .then(res => res)
            .catch(error => error)
            .finally(function () {
                
            });
    }

    function post({ url, payload }) {
        localStorage.setItem('file_token', true)
        return axios.post(url, payload)
            .then(res => res)
            .catch(error => [error, console.log(error)])
    }

    function put({ url, payload }) {
        localStorage.setItem('file_token', true)
        return axios.put(url, payload)
            .then(res => res)
            .catch(error => error)
    }

    return {
        get: get,
        post: post,
        put: put,
    }

})();