import axios from 'axios';
import apiIsidro from "@/services/api_blog.js";
import {getHeader} from "@/services/api_blog.js";
const apiPersonal = axios.create({
    baseURL: import.meta.env.VITE_VUE_APP_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
export default apiPersonal;


export const cargarGastoCajaChica = async(data) =>{
    console.log(data);
    try {
        const response = await apiPersonal.post('/cargargastocajachica', data, getHeader());
        return response.data;
    }
    catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

