// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App'
import router from './router'
import messages from './i18n/messages'
import APIService from './services/api'

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

window.fetch('/static/config.json')
  .then((res) => res.json())
  .then((res) => {
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

    APIService.configure(res)
  })

export default EventBus
