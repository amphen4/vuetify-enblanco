import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
//import HelloWorld from '@/components/HelloWorld.vue';
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';
const routes = [
    {
        path: '/',
        component: DashboardLayout,
        redirect: '/home',
        name: 'Dashboard layout',
        /*
        meta: {
            requiresAuth: true
        },
        */
        children: [
            {
                path: 'login',
                name: 'Login',
                component: Login,
                meta:{
                    title: 'Inicio de sesión'
                }
            },
            {
                path: 'home',
                name: 'Home',
                component: Home,
                meta: {
                    requiresAuth: true,
                    title: 'Home'
                }
            },
        ]
    },
];

export default routes;