import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Dashboard from './Dashboard.vue';
import Home from './Home.vue';
import NewGame from './NewGame.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/newgame', component: NewGame },
  { path: '/dashboard', component: Dashboard },
  { path: '/', component: Home }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export const eBus = new Vue();

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
