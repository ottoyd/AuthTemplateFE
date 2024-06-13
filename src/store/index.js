import { createStore } from 'vuex';
import router from '@/router/index';

const store = createStore({
    state: {
        isAuthenticated: false,
        user: null,
    },
    mutations: {
        setAuthentication(state, payload) {
            state.isAuthenticated = payload.isAuthenticated;
            state.user = payload.user;
        },
    },
    actions: {
        loginAct({ commit }, user) {
            commit('setAuthentication', { isAuthenticated: true, user });
        },
        logoutAct({ commit }) {
            commit('setAuthentication', { isAuthenticated: false, user: null });
            router.push('/login');
        },
    },
    getters: {
        isAuthenticated: (state) => state.isAuthenticated,
        user: (state) => state.user,
    },
});

export default store;
