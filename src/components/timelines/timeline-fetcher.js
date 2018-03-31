import APIService from '../../services/api'

class TimelineFetcher {
  constructor (timeline, type, callback) {
    this.timeline = timeline
    this.callback = callback
    this.type = type
  }

  fetchTimeline (withReplies) {
    return APIService.fetchTimeline(this.timeline, (activities) => {
      if (withReplies) {
        return this.callback(activities)
      }

      return this.callback(activities.filter(activity => activity.in_reply_to_id === null))
    })
  }

  fetchCollection (withReplies) {
    return APIService.fetchCollection(this.timeline, (activities) => {
      return this.callback(activities.filter(activity => activity.in_reply_to_id === null))
    })
  }

  fetch (withReplies) {
    if (this.type === 'timeline') {
      return this.fetchTimeline(withReplies)
    } else if (this.type === 'collection') {
      return this.fetchCollection(withReplies)
    } else if (this.type === 'tag-collection') {
      this.timeline = `tag/${this.timeline}`
      return this.fetchTimeline(withReplies)
    }
  }
}

export default TimelineFetcher
