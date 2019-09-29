import moment from 'moment'

export default {
  methods: {
    timeAgo(date) {
      moment.locale(this.$i18n.locale)
      return moment(date).fromNow()
    }
  }
}
