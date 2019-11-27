/* eslint-disable */
const NodeHelper = require('node_helper');
const say = require('say');
const Sound = require('aplay');
const _ = require('lodash');

//https://github.com/jc21/MMM-Sounds/blob/master/node_helper.js

const soundfilePath = __dirname + '/sounds/notification.wav';

let config = null;
const eventsInMemoryCache = {};

const sampleEvents = [
  {
    title: 'First Event',
    startDate: +new Date(
      'Fri Oct 11 2019 08:37:00 GMT+0530 (India Standard Time)',
    ),
  },
  {
    title: 'Second Event',
    startDate: +new Date(
      'Fri Oct 11 2019 08:37:30 GMT+0530 (India Standard Time)',
    ),
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

  let announcementMessage = config.announcementText;
  if (Array.isArray(config.announcementText)) {
    announcementMessage =
      config.announcementText[
        Math.floor(Math.random() * config.announcementText.length)
      ];
  }
  setTimeout(() => {
    playSound(`${announcementMessage}. ${event.title}`);
  }, eventStartingIn);
};

const registerEventNotifications = events => {
  const currentTimeInMillis = +new Date();
  _.forEach(events, event => {
    const eventTimeInMillis = parseInt(event.startDate);
    const pendingMillisForEvent =
      eventTimeInMillis - currentTimeInMillis - config.notificationLeadTime;
    if (pendingMillisForEvent > 0 && !eventsInMemoryCache[eventTimeInMillis]) {
      registerEventNotification(pendingMillisForEvent, event);
      eventsInMemoryCache[eventTimeInMillis] = true; //to prevent registering event for same time
    }
  });
};

module.exports = NodeHelper.create({
  socketNotificationReceived: (notification, payload) => {
    if (notification === 'CONFIG') {
      if (!config) {
        config = payload;
      }
    }
    if (notification === 'MMM_CALENDAR_NOTIFICATIONS' && config) {
      //registerEventNotifications(sampleEvents);
      registerEventNotifications(payload);
    }
  },
});
