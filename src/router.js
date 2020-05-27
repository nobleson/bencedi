import Vue from 'vue'
Vue.use(Router)
import Router from 'vue-router'
import Hello from './components/Home'
import About from './components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Hello
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})

