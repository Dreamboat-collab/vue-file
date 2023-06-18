import { createRouter, createWebHistory } from 'vue-router';

// 定义路由配置
const routes = [
    // { path: '/', redirect: 'http://localhost:8081/login' }, // 将根路径重定向到'/home'页面
    { path: '/home', component: () => import('@/components/flightPage.vue') },
    { path: '/login', component: () => import('@/components/login-user.vue') },
    { path: '/userinfo', component: () => import('@/components/user-interface.vue') },
    { path: '/flight', component: () => import('@/components/flightPage.vue') },
    { path: '/footer1', component: () => import('@/components/indexFooter1.vue') },
    { path: '/main', component: () => import('@/components/VueMain.vue') },
    // 其他路由配置项
    { path: '/', redirect: '/flight' }, // 将根路径重定向到'/home'页面
];

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes
});

// 导出路由实例
export default router;
