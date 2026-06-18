import axios from 'axios';
import { getApiBaseUrl } from './urls';

const api = axios.create({
    baseURL: getApiBaseUrl(),
    withCredentials: true,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
