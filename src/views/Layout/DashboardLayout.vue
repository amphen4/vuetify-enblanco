<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <v-app-bar-nav-icon v-if="user.name" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <div class="d-flex align-center">
                <v-img
                    v-if="logoUrl()"
                    alt="Logo"
                    class="shrink mr-2"
                    contain
                    :src="logoUrl()"
                    transition="scale-transition"
                    width="40"
                />
            </div>
            <v-spacer></v-spacer>
            <v-menu v-if="user.name" offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    class="mr-2"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    text
                    >
                    <v-icon left>mdi-account</v-icon>
                    Alejandro
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item>
                        <v-btn @click="logout" text color="primary"><v-icon left>mdi-logout</v-icon> Salir</v-btn>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-btn
                v-if="landingUrl()"
                :href="landingUrl()"
                target="_blank"
                text
            >
                <span class="mr-2">Ir a Landing</span>
                <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer v-if="user.name" v-model="drawer" absolute bottom temporary >
            <v-list nav dense >
                <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4" >
                    <v-list-item :to="{name: 'Home'}">
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
        <v-content>
            <fade-transition :duration="200" origin="center top" mode="out-in">
                <router-view></router-view>
            </fade-transition>
        </v-content>
        <google-spin v-show="$store.state.loadingStack"></google-spin>
    </v-app>
</template>

<script>
import { FadeTransition } from 'vue2-transitions';
import {Google} from 'vue-loading-spinner';
import { mapState } from 'vuex'
export default {
    components:{
        FadeTransition,
        'google-spin': Google,
    },
    mounted(){
        
    },
    methods:{
        landingUrl(){
            return process.env.VUE_APP_LANDING_URL;
        },
        logoUrl(){
            return process.env.VUE_APP_LOGO_URL;
        },
        logout(){
            this.$store.dispatch('logout').then( () => {
                // Redirigir a login
            }).catch( error => {
                console.log(error);
            })
        }
    },
    data(){
        return {
            items: [
                {title: 'hola'}
            ],
            drawer: false,
            group: null,
        }
    },
    computed: mapState({
        user: state => state.user
    }),
}
</script>
<style lang="scss">
.spinner.spinner--google{
  z-index: 9999;
  position: fixed;
  right: 2rem;
  bottom: 2rem;
}
</style>