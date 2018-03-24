import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import PublicTimeline from '../components/timelines/public'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'hello-world', component: HelloWorld},
    {path: '/public', component: PublicTimeline}
  ]
})
