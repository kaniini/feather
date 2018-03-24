import Vue from 'vue'
import EventBus from '../main'

const LOGIN_ENDPOINT = '/oauth/token'
const TIMELINES_ENDPOINT = '/api/v1/timelines/'
const STATUSES_ENDPOINT = '/api/v1/statuses'

var TOKEN

/* wrapper to inject TOKEN if set */
let makeAPIRequest = (endpoint, params) => {
  params = params || {}

  if (TOKEN) {
    let headers = params.headers || {}
    headers['Authorization'] = 'Bearer ' + TOKEN.access_token
    params.headers = headers
  }

  return fetch('https://pleroma.dereferenced.org' + endpoint, params)
}

export default {
  login (user, pass) {
    return new Promise((resolve, reject) => {
      if (!user || !pass) {
        reject(new Error('no username or password'))
      }

      let params = new URLSearchParams()

      params.append('grant_type', 'password')
      params.append('name', user)
      params.append('password', pass)
      params.append('client_id', Vue.config.CLIENT_ID)
      params.append('client_secret', Vue.config.CLIENT_SECRET)

      makeAPIRequest(LOGIN_ENDPOINT, {
        method: 'POST',
        body: params
      }).then((response) => {
        return response.json()
      }).then((response) => {
        TOKEN = response
        EventBus.$emit('api.login', {})
        resolve()
      })
    })
  },
  fetchTimeline (timeline, callback, since) {
    let uri = TIMELINES_ENDPOINT + timeline + '?limit=50'
    if (since) {
      uri += '&since_id=' + since
    }

    makeAPIRequest(uri).then((response) => { return response.json() }).then(callback)
  },
  fetchChildren (object, callback) {
    makeAPIRequest(STATUSES_ENDPOINT + '/' + object + '/context').then((response) => { return response.json() }).then(callback)
  },
  isLoggedIn () {
    return TOKEN !== undefined
  },
  postMessage (postData) {
    let payload = JSON.stringify(postData)

    makeAPIRequest(STATUSES_ENDPOINT, {
      body: payload,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }).then((response) => { EventBus.$emit('api.posted-message', response.json()) })
  }
}
