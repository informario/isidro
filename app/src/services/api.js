import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_VUE_APP_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;

export function getHeader() {
    const token = localStorage.getItem('jwt');
    if (!token) {
        console.warn('Token no encontrado en localStorage');
    }
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
}

export async function makeRequest(method, url, data = null) {
    try {
        const response = await api.request({
            method,
            url,
            data,
            ...getHeader(),
        });
        return response.data;
    } catch (error) {
        console.error(`Error en la solicitud ${method.toUpperCase()} ${url}:`, error);
        throw error;
    }
}