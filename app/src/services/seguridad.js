import {makeRequest} from "@/services/api.js";

export const getMemberData = async (data) => {
    const queryString = new URLSearchParams(data).toString();
    return makeRequest('get', `/member?${queryString}`, data);
};