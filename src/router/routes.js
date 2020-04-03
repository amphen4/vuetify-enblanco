import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
//import HelloWorld from '@/components/HelloWorld.vue';
import Login from '@/views/Login.vue';
const routes = [
    {
        path: '/',
        component: DashboardLayout,
        redirect: '/',
        name: 'Dashboard layout',
        /*
        meta: {
            requiresAuth: true
        },
        */
        children: [
            {
                path: '',
                name: 'Login',
                component: Login
            },
        ]
    },
];

export default routes;