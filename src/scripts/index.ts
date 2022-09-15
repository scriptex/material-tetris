import 'scriptex-socials';
import 'html-head-component';

import { $ } from './utils';
import Tetris from './tetris';

const game = new Tetris('tetris');
const startButton = $('start');
const pauseButton = $('pause');

startButton?.addEventListener('click', () => game.start());
pauseButton?.addEventListener('click', () => game.pause());
