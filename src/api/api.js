
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/'
})

export const signin = ({ email, password }) =>
    API.post('api/auth/signin', { email, password });