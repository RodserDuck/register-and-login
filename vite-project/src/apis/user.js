import axios from '../utils/request'

export const userRegisterAPI = function (data){
    return axios({
        method: 'POST',
        url: '/api/reg',
        data: data,
    })
}

export const userLoginAPI = function (data){
    return axios({
        method: 'POST',
        url: '/api/login',
        data: data
    })
}

export const userPassUpdateAPI = function (data){
    return axios({
        method: 'post',
        url: '/api/updatePass',
        data: data
    })
}