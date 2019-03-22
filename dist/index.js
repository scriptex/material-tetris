import { $ } from './views.js';
import { Tetris } from './tetris.js';
const game = new Tetris('tetris');
const startButton = $('start');
const pauseButton = $('pause');
startButton.addEventListener('click', () => {
    game.start();
});
pauseButton.addEventListener('click', () => {
    game.pause();
});
navigator.serviceWorker.register('./service-worker.js');
