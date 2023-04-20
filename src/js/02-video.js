import throttle from '../../node_modules/lodash.throttle/index';
import Player from "../../node_modules/@vimeo/player/dist/player";

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on(
  'timeupdate',
  throttle(function (seconds) {
    localStorage.setItem('videoplayer-current-time', seconds);
  }, 1000)
);

if (localStorage.getItem('videoplayer-current-time')) {
  player
    .setCurrentTime(localStorage.getItem('videoplayer-current-time'))
  }
