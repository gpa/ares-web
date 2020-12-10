import Vue from 'vue';
import vuetify from './plugins/vuetify';
import './registerServiceWorker';
import App from './app/app.vue';
import router from './app/router';
import store from './app/store';
import './main.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
