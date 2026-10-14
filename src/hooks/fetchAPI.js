import axios from 'axios';
import './axiosConfig';

export const APIServices = ( function () {

    function get({ url }) {
        localStorage.removeItem('file_token')
        return axios.get( url )
            .then(res => res)
            .catch(error => error)
            .finally(function () {
                
            });
    }

    function post({ url, payload }) {
        localStorage.removeItem('file_token')
        return axios.post(url, payload)
            .then(res => res)
            .catch(error => [error, console.log(error)])
    }

    function puts({ url, payload }) {
        localStorage.removeItem('file_token')
        return axios.put(url, payload)
            .then(res => res)
            .catch(error => error)
    }

    function deleted({ url }) {
        localStorage.removeItem('file_token')
        return axios.delete(url)
            .then(res => res)
            .catch(error => error)
    }

    function patchs({ url, payload }) {
        localStorage.removeItem('file_token')
        return axios.patch(url, payload)
            .then(res => res)
            .catch(error => error)
    }

    return {
        get: get,
        post: post,
        put: puts,
        deleted: deleted,
        patch : patchs
    }

})();