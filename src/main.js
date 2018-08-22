// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import { setTimeout } from 'timers';
import router from './router';
import store from '../store/index.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../static/font/ksyfont/iconfont.css';
import '../static/font/font/iconfont.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    let exp = parseInt(new Date().getTime()) - parseInt(window.localStorage.getItem('loginkey'));
    if (exp > 86400000) {
        localStorage.clear();
        if (from.path != '/') {
            alert('登录信息已失效！请重新登录');
        }
        if (to.path != '/') {
            alert('登录信息已失效！请重新登录');
        }
    }
    let userStatus = window.localStorage.getItem('userStatus') || false;
    store.commit('changeUserState', userStatus);
    next();
})

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})