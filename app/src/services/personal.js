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

export const getMemberByDNI = async (data) => {
    const queryString = new URLSearchParams(data).toString();
    return makeRequest('get', `/member/dni?${queryString}`, data);
};