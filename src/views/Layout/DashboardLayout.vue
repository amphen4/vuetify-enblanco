<template>
    <v-app>
        <v-app-bar
        app
        color="primary"
        dark
        >
        <div class="d-flex align-center">
            <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
            />

            <v-img
            alt="Vuetify Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
            width="100"
            />
        </div>

        <v-spacer></v-spacer>

        <v-btn
            href="https://github.com/vuetifyjs/vuetify/releases/latest"
            target="_blank"
            text
        >
            <span class="mr-2">Latest Release</span>
            <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
        </v-app-bar>

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
export default {
    components:{
        FadeTransition,
        'google-spin': Google,
    }
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