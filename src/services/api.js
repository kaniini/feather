import Vue from 'vue'
import EventBus from '../main'

const LOGIN_ENDPOINT = '/oauth/token'
const TIMELINES_ENDPOINT = '/api/v1/timelines/'
const STATUSES_ENDPOINT = '/api/v1/statuses'

var TOKEN
var AP_ACTOR

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

/* this way we know who we are */
let fetchAPActor = (info) => {
  makeAPIRequest('/users/' + info.name, {
    headers: {
      'accept': 'application/activity+json'
    }
  }).then((response) => {
    return response.json()
  }).then((response) => {
    AP_ACTOR = response
    EventBus.$emit('api.learned-ap-actor', AP_ACTOR)
  })
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
        EventBus.$emit('api.login', {name: user})
        fetchAPActor({name: user})
        resolve()
      })
    })
  },
  fetchTimeline (timeline, callback, since) {
    let uri = TIMELINES_ENDPOINT + timeline + '?limit=150'
    if (since) {
      uri += '&since_id=' + since
    }

    makeAPIRequest(uri).then((response) => { return response.json() }).then(callback)
  },
  fetchCollection (object, callback, since) {
    let baseURI = `${STATUSES_ENDPOINT}/${object}`
    let basePromise = makeAPIRequest(baseURI).then((response) => {
      return response.json()
    })

    let childrenURI = `${STATUSES_ENDPOINT}/${object}/context`
    let childrenPromise = makeAPIRequest(childrenURI).then((response) => {
      return response.json()
    })

    Promise.all([basePromise, childrenPromise]).then(([base, children]) => {
      callback(Array.concat([base], children.descendants))
    })
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
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    }).then((response) => {
      return response.json()
    }).then((response) => {
      EventBus.$emit('api.posted-message', response)
    })
  },
  getAPActor () {
    return AP_ACTOR
  },
  like (object) {
    makeAPIRequest(STATUSES_ENDPOINT + '/' + object + '/favourite', {
      method: 'POST',
      headers: {
        'accept': 'application/json'
      }
    }).then((response) => {
      return response.json()
    }).then((response) => {
      EventBus.$emit('api.like', response)
    })
  },
  announce (object) {
    makeAPIRequest(STATUSES_ENDPOINT + '/' + object + '/reblog', {
      method: 'POST',
      headers: {
        'accept': 'application/json'
      }
    }).then((response) => {
      return response.json()
    }).then((response) => {
      EventBus.$emit('api.announce', response)
    })
  }
}
