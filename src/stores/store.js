import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import moment from 'moment'

const store = new Vuex.Store({
    state: {
        token_type: localStorage.getItem('token_type') || null,
        access_token: localStorage.getItem('access_token') || null,
        expires_in: localStorage.getItem('expires_in') || null,
        refresh_token: localStorage.getItem('refresh_token') || null,
        loadingStack: 0,
        user:{}
    },
    getters: {
        isTokenExpires(state){
            let fecha = new Date(state.expires_in);
            if( moment().isSameOrAfter(fecha) ){
                return true;
            }else{
                return false;
            }
        },
    },
    mutations: {
        incrementLoadingStack(state){
            state.loadingStack++;
        },
        decrementLoadingStack(state){
            state.loadingStack--;
        },
        setApiToken(state, credentials){
            localStorage.setItem('token_type', credentials.token_type);
            localStorage.setItem('access_token', credentials.access_token);
            localStorage.setItem('expires_in', credentials.expires_in);
            localStorage.setItem('refresh_token', credentials.refresh_token);
            state.token_type = credentials.token_type;
            state.access_token = credentials.access_token;
            state.expires_in = credentials.expires_in;
            state.refresh_token = credentials.refresh_token;
        },
        unsetApiToken(state){
            state.token_type = null;
            state.access_token = null;
            state.expires_in = null;
            state.refresh_token = null;
            localStorage.removeItem('token_type');
            localStorage.removeItem('access_token');
            localStorage.removeItem('expires_in');
            localStorage.removeItem('refresh_token');
        },
        setUser(state, data){
            state.user = data;
        },
        unsetUser(state){
            state.user = {};
        }
    },
    actions: {
        login({ commit }, credentials){
            return new Promise((resolve, reject) => {
                // Login OAuth2 Laravel Passport Client Password
                Vue.axios({
                    url: 'auth/login',
                    data: credentials, // Deberia ser: {username: ..., password: ...}
                    method: 'POST'
                }).then( response => {
                    Vue.axios.defaults.headers.common['Authorization'] = response.data.token_type+' '+response.data.access_token;
                    commit('setApiToken', {
                        token_type: response.data.token_type,
                        access_token: response.data.access_token,
                        expires_in: moment().add(response.data.expires_in, 's').format("YYYY-MM-DD HH:mm:ss") ,
                        refresh_token: response.data.refresh_token,
                    });
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                });
            })
        },
        logout(context){
            Vue.axios.defaults.headers.common['Authorization'] = null;
            context.commit('unsetApiToken');
            context.commit('unsetUser');
        },
        fetchUser(context){
            return new Promise((resolve,reject) => {
                Vue.axios({
                    url: 'auth/user',
                    method: 'GET',
                }).then( response => {
                    context.commit('setUser', response.data);
                    resolve(response);
                }).catch( error => {
                    reject(error);
                });
            });
        },
        refreshLogin(context){
            return new Promise((resolve,reject) => {
                Vue.axios({
                    url: 'auth/refresh',
                    method: 'POST',
                    data: {
                        token: context.getters.getRefreshToken,
                    }
                }).then( response => {
                    context.commit('setApiToken', { 
                        token_type: response.data.token_type,
                        access_token: response.data.access_token,
                        expires_in: moment().add(response.data.expires_in, 's').format("YYYY-MM-DD HH:mm:ss") ,
                        refresh_token: response.data.refresh_token,
                    });
                    resolve(response);
                }).catch( error => {
                    reject(error);
                });
            });
        },
    }
});

export default store;
