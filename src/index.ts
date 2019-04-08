import { $ } from './utils.js';
import Tetris from './tetris.js';

const game = new Tetris('tetris');
const startButton = $('start');
const pauseButton = $('pause');

const isLocalhost: boolean = Boolean(
	window.location.hostname === 'localhost' ||
		window.location.hostname === '[::1]' ||
		window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

startButton.addEventListener('click', () => game.start());
pauseButton.addEventListener('click', () => game.pause());

if (!isLocalhost) {
	navigator.serviceWorker.register('./service-worker.js');
}
