import {makeRequest} from "@/services/api.js";

export const getIncomes = async (data) => {
    const queryString = new URLSearchParams(data).toString();
    return makeRequest('get', `/expenses/income?${queryString}`, data);
};
