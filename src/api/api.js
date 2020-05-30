
import axios from 'axios';
import qs from 'qs';

const makeAPI = () => {
    const token = localStorage.getItem('token');

    const API = axios.create({
        baseURL: 'http://161.35.118.222/',
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

export const getCustomers = () =>
    makeAPI().get('api/getCustomers')

export const addBroadcast = (broadcast) => {
    console.log(broadcast);
    return makeAPI().post('api/addBroadcast', broadcast)
}

export const getBroadcasts = () =>
    makeAPI().get('api/getBroadcasts')