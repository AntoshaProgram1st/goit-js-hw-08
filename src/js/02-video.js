import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player.on(
  'timeupdate',
  throttle(function () {
    player
      .getCurrentTime()
      .then(function (seconds) {
        localStorage.setItem('videoplayer-current-time', seconds);
      })
      .catch(function (error) {
        // an error occurred
      });
  }, 1000)
);

if (localStorage.getItem('videoplayer-current-time')) {
  player
    .setCurrentTime(localStorage.getItem('videoplayer-current-time'))
    .then(function (seconds) {
      // seconds = the actual time that the player seeked to
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
}
