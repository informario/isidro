import {makeRequest} from "@/services/api.js";

export const loadpettycashexpense = async (data) => {
    return makeRequest('post', '/expenses/loadpettycashexpense', data);
};
