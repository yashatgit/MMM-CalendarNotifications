const say = require('say');
const Player = require('aplay');
const soundfilePath = __dirname + '/sounds/notification.wav';

const playSound = text => {
  //path.normalize(soundfilePath)
  //new Player('./sounds/notification.mp3').play();
  new Player().play(soundfilePath);
  setTimeout(() => {
    say.speak(text);
  }, 1500);
};

playSound('Guys! there is an event coming up');
