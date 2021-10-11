import Router from 'vue-router';
import store from '@/stores';

import AppLogin from '@/components/Login';
import AppRegister from '@/components/Register';
import Calendar from '@/components/Calendar';
import Meetings from '@/components/Meetings';
import Teams from '@/components/Teams';
import SearchFilter from "@/components/SearchFilter";
import AddMeetings from "@/components/AddMeeting";

const router = new Router({
    mode: 'history',
    routes: [
        {
            name: 'login',
            path: '/',
            component: AppLogin,
            meta: { requiresNavbar: false, requiresFooter: false, requiresAuth: true }
        },
        {
            name: 'register',
            path: '/register',
            component: AppRegister,
            meta: { requiresNavbar: false, requiresFooter: false,requiresAuth: false }
        },
        {
            name: 'calendar',
            path: '/calendar',
            component: Calendar,
            meta: { requiresNavbar: true, requiresFooter: true,requiresAuth: true }
        },
        {
            name: 'meetings',
            path: '/meetings',
            component: Meetings,
            meta: { requiresNavbar: true, requiresFooter: true,requiresAuth: true },
            children: [
                {
                    name: 'SearchFilter',
                    path: '',
                    component: SearchFilter,
                    meta: { requiresNavbar: true, requiresFooter: true,requiresAuth: true }
                },
                {
                    name: 'AddMeetings',
                    path: 'addMeeting',
                    component: AddMeetings,
                    meta: { requiresNavbar: true, requiresFooter: true,requiresAuth: true }
                }
            ]
        },
        {
            name: 'teams',
            path: '/teams',
            component: Teams,
            meta: { requiresNavbar: true, requiresFooter: true,requiresAuth: true }
        }
    ]
});
router.beforeEach(( to, from, next ) => {
    if(to.name !== 'register' && to.name !== 'login' && !store.getters.isAuthenticated ) {
            return next({
                name: 'login'
            });
        }
    
    else{
        // if (from.name === 'login' && to.name === 'register'){
            next(
            //     {
            //     name: 'register'
            // }
            );
        // }
    }
    // if( to.name !== 'login' && !store.getters.isAuthenticated ) {
    //     return next({
    //         name: 'login'
    //     });
    // }
    // if( from.name === 'login' && to.name === 'register'  && !store.getters.isAuthenticated) {
    //     return next({
    //         name: 'register'
    //     });
    // }
    next();
});

export default router;