// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App'
import router from './router'
import messages from './i18n/messages'

Vue.config.productionTip = false
Vue.config.ENDPOINT = 'https://pleroma.dereferenced.org/'
Vue.config.CLIENT_ID = 'jt_iEiUCT6FbwkY0Ww2Z5r8k_gabs9f2KpYpmJKR65E='
Vue.config.CLIENT_SECRET = 'TvVRNpTsGmNnwktOyJ_W6vRmHXPTrrs6m6Wl4Sp9zpA='
Vue.config.SITE_URL = 'http://localhost:8080'

Vue.use(VueI18n)

const currentLocale = (window.navigator.language || 'en').split('-')[0]
const i18n = new VueI18n({
  locale: currentLocale,
  fallbackLocale: 'en',
  messages
})

const EventBus = new Vue()
Object.defineProperties(Vue.prototype, {
  $bus: {
    get () { return EventBus }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: {
    App
  },
  template: '<App/>'
})

export default EventBus
