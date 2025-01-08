import axios from 'axios';

const apiIsidro = axios.create({
    baseURL: import.meta.env.VITE_VUE_APP_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
export default apiIsidro;

function getHeader(){
    const token = localStorage.getItem('jwt');
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
  }

export const getAuthToken = async (data) =>{
    try {
        const response = await apiIsidro.post('/login', data, getHeader());
        return response.data.accessToken;
    }
    catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export const sendSignUpForm = async(data) =>{
    try {
        const response = await apiIsidro.post('/signupform', data, getHeader());
        return response.data.authToken;
    }
    catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export const sayHello = async(data) =>{
    try {
        const response = await apiIsidro.get('/hello', getHeader());
        return response.data.authToken;
    }
    catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}