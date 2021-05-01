import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
// Router
import router from './router';
// Vuex
import store from './stores/store';
// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = process.env.VUE_APP_API_URL
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

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!store.state.access_token) {
        next({
          name: 'Login',
        });
      }else{
        Vue.axios.defaults.headers.common['Authorization'] = store.state.token_type+' '+store.state.access_token;
        if(!store.getters['isTokenExpires']){
          store.dispatch('fetchUser').then( () => {
            next();
          }).catch( error => {
            console.log(error);
            next({
              name: 'Login',
            });
          });
        }else{
          store.dispatch('refreshLogin')
          .then( response => {
            console.log(response);
            store.dispatch('fetchUser').then( () => {
              next();
            }).catch( error => {
              console.log(error);
              next({
                name: 'Login',
              });
            });
          }).catch( error => {
            console.log(error);
            next({
              name: 'Login',
            });
          })
        }
      }
    } else {
      next() // make sure to always call next()!
    }
  });

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
