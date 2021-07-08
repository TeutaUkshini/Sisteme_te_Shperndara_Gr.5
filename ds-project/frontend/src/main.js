#Krijimi i main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = 'http://localhost:5001/kidshouse-d646d/us-central1/app/api';
axios.defaults.headers.common.Accept = 'application/json';


Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
