import APIService from '../../services/api'

class TimelineFetcher {
  constructor (timeline, callback) {
    this.timeline = timeline
    this.callback = callback
  }

  fetch (withReplies) {
    console.log('fetching activities for', this.timeline)
    return APIService.fetchTimeline(this.timeline, (activities) => {
      if (withReplies) {
        return this.callback(activities)
      }

      return this.callback(activities.filter(activity => activity.in_reply_to_id === null))
    })
  }
}

export default TimelineFetcher
