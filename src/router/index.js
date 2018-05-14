import Vue from 'vue'
import Router from 'vue-router'
import HomeTimeline from '../components/timelines/home'
import PublicTimeline from '../components/timelines/public'
import LocalTimeline from '../components/timelines/local'
import CollectionTimeline from '../components/timelines/collection'
import TagCollectionTimeline from '../components/timelines/tag-collection'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'home', component: PublicTimeline},
    {path: '/public', component: PublicTimeline},
    {path: '/public/local', component: LocalTimeline},
    {path: '/home', component: HomeTimeline},
    {path: '/collections/:collection', name: 'timeline.collection', component: CollectionTimeline},
    {path: '/tag/:collection', name: 'tag.collection', component: TagCollectionTimeline}
  ]
})
