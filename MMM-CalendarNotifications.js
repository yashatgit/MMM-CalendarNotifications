/* eslint-disable */

Module.register('MMM-CalendarNotifications', {
  defaults: {
    notificationLeadTime: 5 * 60 * 1000, //5mins in millis
    announcementText: 'Upcoming event',
  },

  start: function() {
    this.sendSocketNotification('CONFIG', this.config);
    Log.info('Starting MMM-CalendarNotifications module');
  },
  notificationReceived: function(notification, payload) {
    if (notification === 'CALENDAR_EVENTS') {
      this.sendSocketNotification('MMM_CALENDAR_NOTIFICATIONS', payload);
    }
  },
  getDom: function() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `Hello`;
    return wrapper;
  },
});
