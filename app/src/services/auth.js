import {makeRequest} from "@/services/api.js";

export const login = async (data) => {
    return await makeRequest('post', '/auth/login', data);
};

export const signup = async (data) => {
    return await makeRequest('post', '/auth/signup', data);
};

export const isauth = async () => {
    return await makeRequest('get', '/auth/isauth');
};