const say = require('say');
const Player = require('aplay');
const soundfilePath = __dirname + '/sounds/notification.wav';

const playSound = text => {
  //path.normalize(soundfilePath)
  //new Player('./sounds/notification.mp3').play();
  new Player().play(soundfilePath);
  setTimeout(() => {
    say.speak(text);
  }, 800);
};

const announcements = [
  'Guys! there is an event coming up',
  'O Captain my Captain, there is an event coming up',
  'Sir, be ready for an upcoming event',
  'Gentle reminder for',
];
const randomAnnouncement =
  announcements[Math.floor(Math.random() * announcements.length)];

playSound(randomAnnouncement);
//playSound('Guys! there is an event coming up');
