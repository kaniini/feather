import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import HomeTimeline from '../components/timelines/home'
import PublicTimeline from '../components/timelines/public'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'home', component: PublicTimeline},
    {path: '/public', component: PublicTimeline},
    {path: '/home', component: HomeTimeline}
  ]
})
