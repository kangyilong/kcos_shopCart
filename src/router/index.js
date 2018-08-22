import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'index',
        component: resolve => require(['@/components/index'], resolve)
    }, {
        path: '/register',
        name: 'userRegister',
        component: resolve => require(['@/components/register'], resolve)
    }, {
        path: '/login',
        name: 'userLogin',
        component: resolve => require(['@/components/login'], resolve)
    }, {
        path: '/detshop',
        name: 'shopdet',
        component: resolve => require(['@/components/shopdet'], resolve)
    }, {
        path: '/addShop',
        name: 'addSuccessShop',
        component: resolve => require(['@/components/addSuccessShop'], resolve)
    }, {
        path: '/cartShop',
        name: 'shopCart',
        component: resolve => require(['@/components/shopCart'], resolve)
    }, {
        path: '/orderShop',
        name: 'shopOrder',
        component: resolve => require(['@/components/shopOrder'], resolve)
    }, {
        path: '/personage', // personage
        name: 'personageIndex',
        component: resolve => require(['@/components/personage/personage'], resolve),
        children: [{
            path: '/personage/dex',
            component: resolve => require(['@/components/personage/per-components/personage-dex'], resolve)
        }, {
            path: '/personage/order',
            component: resolve => require(['@/components/personage/per-components/personage-order'], resolve),
            children: [{
                path: '/personage/order/dzf',
                component: resolve => require(['@/components/personage/per-components/perorder-com/perorder-dzf'], resolve)
            }, {
                path: '/personage/order/dsh',
                component: resolve => require(['@/components/personage/per-components/perorder-com/perorder-dsh'], resolve)
            }, {
                path: '/personage/order/yqx',
                component: resolve => require(['@/components/personage/per-components/perorder-com/perorder-yqx'], resolve)
            }],
            redirect: '/personage/order/dzf'
        }, {
            path: '/personage/collect',
            component: resolve => require(['@/components/personage/per-components/personage-collect'], resolve)
        }, {
            path: '/personage/consume',
            component: resolve => require(['@/components/personage/per-components/personage-consume'], resolve)
        }, {
            path: '/personage/site',
            component: resolve => require(['@/components/personage/per-components/personage-site'], resolve)
        }],
        redirect: '/personage/dex' // 默认展示的页面
    }],
    scrollBehavior(to, from, savedPosition) { // vue滚动行为
        return { x: 0, y: 0 };
    }
})