import axios from '../utils/axios';

export function authenticate(email, password) {
    return axios({
        method: 'post',
        url: '/auth',
        data: {
            email,
            password,
        }
    });
}