/* eslint-disable */
const NodeHelper = require('node_helper');
const say = require('say');
const Sound = require('aplay');
const _ = require('lodash');

//https://github.com/jc21/MMM-Sounds/blob/master/node_helper.js

const soundfilePath = __dirname + '/sounds/notification.mp3';

let config = null;

const events = [
  {
    title: 'Next day Meal prep',
    startDate: +new Date(
      'Thu Oct 10 2019 22:55:45 GMT+0530 (India Standard Time)',
    ),
    endDate: '1570725000000',
    fullDayEvent: false,
    firstYear: 2019,
    location: false,
    geo: false,
    description: false,
    symbol: 'calendar-check',
    calendarName: '',
    color: '#fff',
  },
  {
    title: 'My custom---2',
    startDate: '1570811100000',
    endDate: '1570811400000',
    fullDayEvent: false,
    firstYear: 2019,
    location: false,
    geo: false,
    description: false,
    symbol: 'calendar-check',
    calendarName: '',
    color: '#fff',
  },
];

const playSound = text => {
  new Sound().play(soundfilePath);
  setTimeout(() => {
    say.speak(text);
  }, 1500);
};

const registerEventNotification = (eventStartingIn, event) => {
  console.log(`notifying in ${eventStartingIn} millis`);
  setTimeout(() => {
    playSound(`${config.announcementText}. ${event.title}`);
  }, eventStartingIn);
};

const registerEventNotifications = events => {
  const currentTimeInMillis = +new Date();
  _.forEach(events, event => {
    const pendingMillisForEvent =
      event.startDate - currentTimeInMillis - config.notificationLeadTime;
    if (pendingMillisForEvent > 0) {
      registerEventNotification(pendingMillisForEvent, event);
    }
  });
};

module.exports = NodeHelper.create({
  socketNotificationReceived: (notification, payload) => {
    if (notification === 'CONFIG') {
      console.log({ config });
      if (!config) {
        config = payload;
      }
    }
    if (notification === 'MMM_CALENDAR_NOTIFICATIONS' && config) {
      registerEventNotifications(events);
    }
  },
});
