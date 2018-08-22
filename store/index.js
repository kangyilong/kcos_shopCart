import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import userState from './userState/index.js';
import shopState from './shopState/index.js';

export default new Vuex.Store({
    state: {
        userState,
        shopState
    },
    mutations: {
        changeUserState(state, status) {
            state.userState.userStatus = status;
        },
        changeShopState(state, shopId) {
            state.shopState.shopId = shopId;
        },
        changeShopCollect(state, shopCollect) {
            state.shopState.shopCollect = shopCollect;
        }
    },
    actions: {}
})