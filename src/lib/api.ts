import axios from 'axios';
import { buildBackendUrl, getApiBaseUrl } from './urls';

const api = axios.create({
    baseURL: getApiBaseUrl(),
    withCredentials: true,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
    headers: {
        'Content-Type': 'application/json',
    },
});

let csrfToken: string | null = null;
let csrfPromise: Promise<string | null> | null = null;

function isUnsafeMethod(method?: string) {
    return ['post', 'put', 'patch', 'delete'].includes((method || 'get').toLowerCase());
}

function isCsrfError(error: any) {
    const detail = String(error?.response?.data?.detail || error?.response?.data?.error || '');
    return error?.response?.status === 403 && detail.toLowerCase().includes('csrf');
}

async function fetchCsrfToken(force = false) {
    if (csrfToken && !force) return csrfToken;
    if (!csrfPromise || force) {
        csrfPromise = axios
            .get(buildBackendUrl('/api/auth/csrf/'), {
                withCredentials: true,
                headers: { Accept: 'application/json' },
            })
            .then((response) => {
                csrfToken = response.data?.csrfToken || '';
                return csrfToken;
            })
            .finally(() => {
                csrfPromise = null;
            });
    }
    return csrfPromise;
}

api.interceptors.request.use(async (config: any) => {
    if (isUnsafeMethod(config.method)) {
        const token = await fetchCsrfToken();
        config.headers = config.headers || {};
        if (token) config.headers['X-CSRFToken'] = token;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error?.config || {};
        if (isCsrfError(error) && isUnsafeMethod(config.method) && !config._csrfRetried) {
            config._csrfRetried = true;
            const token = await fetchCsrfToken(true);
            config.headers = config.headers || {};
            if (token) config.headers['X-CSRFToken'] = token;
            return api(config);
        }
        return Promise.reject(error);
    },
);

export default api;
