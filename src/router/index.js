import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
            }, {
                path: "/member",
                name: "member",
                meta: {
                    title: '人员管理'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/Member.vue")
            },
            {
                path: "/table",
                name: "basetable",
                meta: {
                    title: '投诉管理'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/BaseTable.vue")
            },
            {
                path: "/information",
                name: "information",
                meta: {
                    title: '资讯管理'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/Information.vue")
            }, {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: '通知'
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/Tabs.vue")
            }, {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心'
                },
                component: () => import (/* webpackChunkName: "user" */ '../views/User.vue')
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/Login.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 守护大气后台管理系统`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin'
            ? next()
            : next('/403');
    } else {
        next();
    }
});

export default router;