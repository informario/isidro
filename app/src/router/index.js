import { createRouter, createMemoryHistory } from 'vue-router';
import LogInForm from '@/components/LogInForm.vue'
import SignUpForm from '@/components/SignUpForm.vue'
import App from '@/components/App.vue'
import Personal from '@/components/Personal.vue'
import NotFound from '@/components/NotFound.vue'
import JefaDeCampo from "@/components/JefaDeCampo.vue";
import Seguridad from "@/components/Seguridad.vue";

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
        path: '/jefadecampo',
        name: 'JefaDeCampo',
        component: JefaDeCampo
    },
    {
        path: '/seguridad',
        name: 'Seguridad',
        component: Seguridad
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