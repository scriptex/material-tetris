import TouchSweep from 'touchsweep';

import * as consts from './consts';
import * as shapes from './shapes';
import * as matrix from './matrix';

import TetrisView from './views';
import TetrisCanvas from './canvas';

import { $ } from './utils';
import {
	scene,
	side,
	info,
	preview,
	level,
	score,
	rewardInfo,
	reward,
	gameOver,
	btnRestart,
	finalScore
} from './elements';

export const defaults: shapes.IndexedList<number> = {
	maxHeight: 700,
	maxWidth: 600
};

const touchEventsMap: shapes.IndexedList<string> = {
	tap: 'tap',
	swipeleft: 'swipeleft',
	swipeup: 'swipeup',
	swiperight: 'swiperight',
	swipedown: 'swipedown'
};

export default class Tetris {
	public touchSwipeInstance: TouchSweep | null = null;

	private level: number = 0;
	private score: number = 0;
	private shape: shapes.Shape | null = null;
	private matrix: matrix.Row[] = [];
	private isOver: boolean = false;
	private running: boolean = false;
	private interval: number = -1;
	private startTime: number = 0;
	private currentTime: number = 0;
	private prevTime: number = 0;
	private levelTime: number = 0;
	private container: HTMLElement;
	private tetrisView: TetrisView | null = null;
	private tetrisCanvas: TetrisCanvas | null = null;
	private preparedShape: shapes.Shape | null = null;

	constructor(id: string) {
		this.container = $(id) as HTMLElement;
		this.init();
	}

	public start = (): void => {
		this.running = true;

		window.requestAnimationFrame(this.refresh);

		this.container.classList.add('is--running');
	};

	public pause = (): void => {
		this.running = false;
		this.currentTime = new Date().getTime();
		this.prevTime = this.currentTime;

		this.container.classList.remove('is--running');
	};

	private init = (options: shapes.IndexedList<number> = {}): void => {
		const config: shapes.IndexedList<number> = {
			...defaults,
			...options
		};

		this.interval = consts.DEFAULT_INTERVAL;

		this.tetrisView = new TetrisView(
			{
				width: config.maxWidth,
				height: config.maxHeight
			},
			{
				scene,
				side,
				info,
				level,
				score,
				reward,
				preview,
				gameOver,
				btnRestart,
				rewardInfo,
				finalScore,
				container: this.container
			}
		);

		this.tetrisCanvas = new TetrisCanvas(scene, preview);

		this.matrix = matrix.init(consts.ROW_COUNT, consts.COLUMN_COUNT);

		this.reset();
		this.addEventListeners();
		this.drawShape();
	};

	private reset = (): void => {
		this.running = false;
		this.isOver = false;
		this.level = 1;
		this.score = 0;
		this.startTime = new Date().getTime();
		this.currentTime = this.startTime;
		this.prevTime = this.startTime;
		this.levelTime = this.startTime;
		this.matrix = matrix.clear(this.matrix);

		this.tetrisView?.setLevel(this.level);
		this.tetrisView?.setScore(this.score);
		this.tetrisView?.setGameOver(this.isOver);

		this.draw();
	};

	private touchHandler = (): void => {
		this.touchSwipeInstance = new TouchSweep(scene, {}, 20);

		Object.keys(touchEventsMap).forEach((eventName: string): void => {
			scene.addEventListener(eventName, event => {
				this.respondToGesture(touchEventsMap[event.type]);
			});
		});
	};

	private keyboardHandler = (e: KeyboardEvent): void => {
		if (this.isOver || !this.shape || !this.running) {
			return;
		}

		this.respondToGesture(e.code);
	};

	private respondToGesture = (code: string): void => {
		const area: matrix.Row[] = this.matrix;

		switch (code) {
			case touchEventsMap.swipeleft:
				this.shape?.goLeft(area);
				this.draw();

				break;

			case touchEventsMap.swipeup:
				this.shape?.rotate(area);
				this.draw();

				break;

			case touchEventsMap.swiperight:
				this.shape?.goRight(area);
				this.draw();

				break;

			case touchEventsMap.swipedown:
				this.shape?.goDown(area);
				this.draw();

				break;
		}
	};

	private restart = (): void => {
		this.reset();
		this.start();
	};

	private addEventListeners = (): void => {
		this.touchHandler();
		window.addEventListener('keydown', this.keyboardHandler, false);
		btnRestart.addEventListener('click', this.restart, false);
	};

	private drawShape = (): void => {
		this.shape = this.preparedShape || shapes.randomShape();
		this.preparedShape = shapes.randomShape();

		this.draw();

		this.tetrisCanvas?.drawPreviewShape(this.preparedShape);
	};

	private draw = (): void => {
		this.tetrisCanvas?.drawScene();

		if (this.shape) {
			this.tetrisCanvas?.drawShape(this.shape);
		}

		this.tetrisCanvas?.drawMatrix(this.matrix);
	};

	private refresh = (): void => {
		if (!this.running) {
			return;
		}

		this.currentTime = new Date().getTime();

		if (this.currentTime - this.prevTime > this.interval) {
			this.update();
			this.prevTime = this.currentTime;
			this.setLevel();
		}

		if (!this.isOver) {
			window.requestAnimationFrame(this.refresh);
		}
	};

	private update = (): void => {
		if (this.shape?.canMoveDown(this.matrix)) {
			this.shape?.goDown(this.matrix);
		} else {
			this.shape?.copyTo(this.matrix);

			this.setScore();
			this.drawShape();
		}

		this.draw();

		this.isOver = matrix.isOver(this.matrix);

		this.tetrisView?.setGameOver(this.isOver);

		if (this.isOver) {
			this.tetrisView?.setFinalScore(this.score);
		}
	};

	private setScore = (): void => {
		const rows: number[] = matrix.getFullRows(this.matrix);

		if (!rows.length) {
			return;
		}

		matrix.removeRows(this.matrix, rows);

		const currentScore: number = matrix.getScore(rows);
		const currentReward: number = matrix.getReward(rows);

		this.score += currentScore + currentReward;

		this.tetrisView?.setScore(this.score);
		this.tetrisView?.setReward(currentReward);
	};

	private setLevel = (): void => {
		const currentTime: number = new Date().getTime();

		if (currentTime - this.levelTime <= consts.LEVEL_INTERVAL) {
			return;
		}

		this.level += 1;
		this.interval = matrix.getInterval(this.level);

		this.tetrisView?.setLevel(this.level);

		this.levelTime = currentTime;
	};
}
