
import axios from 'axios';
import qs from 'qs';

const makeAPI = () => {
    const token = localStorage.getItem('token');

    const API = axios.create({
        baseURL: 'http://161.35.118.222/',
        // baseURL: 'http://localhost:8000/',
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
            'Authorization': token ? `Bearer ${token}` : '',
        },
    })

    return API;
}



export const signin = ({ email, password }) =>
    makeAPI().post('api/auth/signin', { email, password });

export const importCustomers = (customers) =>
    makeAPI().post('api/importCustomer', customers)

export const getCustomers = ({ rowPerPage, page }) =>
    makeAPI().post(`api/getCustomers?page=${page}`, { rowPerPage });

export const addBroadcast = (broadcast) =>
    makeAPI().post('api/addBroadcast', broadcast)

export const getBroadcasts = () =>
    makeAPI().get('api/getBroadcasts')

export const getDashboard = () =>
    makeAPI().get('api/dashboard')