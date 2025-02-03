import {makeRequest} from "@/services/api.js";

export const loadPettyCashExpense = async (data) => {
    return makeRequest('post', '/expenses/loadpettycashexpense', data);
};


export const loadIncome = async (data) => {
    return makeRequest('post', '/expenses/loadincome', data);
};