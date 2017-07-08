// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

// const routes = [
//   { path: '/seller', component: seller }
// ]

// const routers = new Router({
//   routes: routes // （缩写）相当于 routes: routes
// })

// export default new Router({
//   routes: [
//     routers
//   ]
