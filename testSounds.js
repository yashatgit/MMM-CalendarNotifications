const say = require('say');
const Sound = require('aplay');
const soundfilePath = __dirname + '/sounds/notification.mp3';

const playSound = text => {
  new Sound().play(soundfilePath);
  setTimeout(() => {
    say.speak(text);
  }, 1500);
};

playSound('Guys! there is an event coming up');
