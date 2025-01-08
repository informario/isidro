import { createRouter, createMemoryHistory } from 'vue-router';
import LogInForm from '@/components/LogInForm.vue'
import SignUpForm from '@/components/SignUpForm.vue'
import App from '@/components/App.vue'

const routes = [
    {
        path: '/login',
        name: 'LogInForm',
        component: LogInForm
    },
    {
        path: '/signup',
        name: 'SignUpForm',
        component: SignUpForm
    },
    {
        path: '/',
        name: 'App',
        component: App // Puedes redirigir a cualquier componente que desees como página principal
    },
];


const router = createRouter({
    history: createMemoryHistory(),
    routes
});


export default router;