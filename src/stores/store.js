import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

Vue.axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    store.commit('incrementLoadingStack');
    return config;
}, function (error) {
    store.commit('decrementLoadingStack');
    // Do something with request error
    return Promise.reject(error);
});
Vue.axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    store.commit('decrementLoadingStack');
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    store.commit('decrementLoadingStack');
    return Promise.reject(error);
});

const store = new Vuex.Store({
    state: {
      
      loadingStack: 0,
    },
    getters: {

    },
    mutations: {
        incrementLoadingStack(state){
            state.loadingStack++;
        },
        decrementLoadingStack(state){
            state.loadingStack--;
        },
    },
    actions: {

    }
});

export default store;
