import { createRouter, createMemoryHistory } from 'vue-router';
import LogInForm from '@/components/LogInForm.vue'
import SignUpForm from '@/components/SignUpForm.vue'
import App from '@/components/App.vue'
import Personal from '@/components/Personal.vue'
import NotFound from '@/components/NotFound.vue'

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
        path: '/personal',
        name: 'Personal',
        component: Personal
    },
    {
        path: '',
        redirect: '/login', // O cualquier ruta válida
    },
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: NotFound
    },
];


const router = createRouter({
    history: createMemoryHistory(),
    routes
});


export default router;