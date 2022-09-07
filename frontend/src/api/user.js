import axios from '../utils/axios';

export function authenticate(email, password) {
    return axios({
        method: 'post',
        url: '/auth',
        data: {
            email,
            password,
        },
    });
}

export function editDetails(token, mobile_number) {
    return axios({
        method: 'put',
        url: '/user',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            mobile_number,
        },
    });
}

export function getUsers(token) {
    return axios({
        method: 'get',
        url: '/user',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export function getUserDetails(token, userId) {
    return axios({
        method: 'get',
        url: `/user/${userId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export function addUser(
    token,
    username,
    password,
    email,
    mobile_number,
    user_group,
    department,
) {
    return axios({
        method: 'post',
        url: '/user',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            username,
            password,
            email,
            mobile_number,
            user_group,
            department,
        },
    });
}

export function updateUser(
    token,
    userId,
    username,
    password,
    email,
    mobile_number,
    user_group,
    department,
) {
    return axios({
        method: 'put',
        url: `/user/${userId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            username,
            password,
            email,
            mobile_number,
            user_group,
            department,
        },
    })
}

export function deleteUser(token, userId) {
    return axios({
        method: 'delete',
        url: `/user/${userId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}