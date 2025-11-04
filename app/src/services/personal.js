import {makeRequest} from "@/services/api.js";

export const loadPettyCashExpense = async (data) => {
    return makeRequest('post', '/expenses/pettycashexpense', data);
};

export const loadIncome = async (data) => {
    return makeRequest('post', '/expenses/income', data);
};

export const enroll = async (data) => {
    return makeRequest('post', '/member/enroll', data);
};
export const update = async (data) => {
    return makeRequest('post', '/member/update', data);
};

export const getMemberByDNI = async (data) => {
    const queryString = new URLSearchParams(data).toString();
    return makeRequest('get', `/member/dni?${queryString}`);
};

export const getAllMembers = async () => {
    // Actualmente el endpoint devuelve todos los members sin parámetros
    return makeRequest('get', '/member/all');
};

export const getLastChanges = async () => {
    return makeRequest('get', '/member/lastChanges');
};