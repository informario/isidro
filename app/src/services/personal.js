import {makeRequest} from "@/services/api.js";

export const loadPettyCashExpense = async (data) => {
    return makeRequest('post', '/expenses/pettycashexpense', data);
};

export const loadIncome = async (data) => {
    return makeRequest('post', '/expenses/income', data);
};