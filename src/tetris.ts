import * as consts from './consts.js';
import * as shapes from './shapes.js';
import * as matrix from './matrix.js';
import TouchSweep from './touchswipe.js';
import TetrisCanvas from './canvas.js';
import { tetrisView, scene, preview, btnRestart } from './views.js';

export const defaults: shapes.IndexedList<number> = {
	maxHeight: 700,
	maxWidth: 600
};

export default class Tetris {
	public touchSwipeInstance: TouchSweep;

	private id: string;
	private level: number;
	private score: number;
	private shape: shapes.Shape;
	private matrix: matrix.Row[];
	private isOver: boolean;
	private running: boolean;
	private interval: number;
	private startTime: number;
	private currentTime: number;
	private prevTime: number;
	private levelTime: number;
	private tetrisCanvas: TetrisCanvas;
	private preparedShape: shapes.Shape;

	constructor(id: string) {
		this.id = id;
		this.init();
	}

	public start = (): void => {
		this.running = true;

		window.requestAnimationFrame(this.refresh.bind(this));
	};

	public pause = (): void => {
		this.running = false;
		this.currentTime = new Date().getTime();
		this.prevTime = this.currentTime;
	};

	private init = (options: shapes.IndexedList<number> = {}): void => {
		const config: shapes.IndexedList<number> = {
			...defaults,
			...options
		};

		this.interval = consts.DEFAULT_INTERVAL;

		tetrisView.init(this.id, config.maxWidth, config.maxHeight);
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

		tetrisView.setLevel(this.level);
		tetrisView.setScore(this.score);
		tetrisView.setGameOver(this.isOver);

		this.draw();
	};

	private touchHandler = (): void => {
		this.touchSwipeInstance = new TouchSweep(scene);

		const touchEventsMap: shapes.IndexedList<number> = {
			tap: 32,
			swipeleft: 37,
			swipeup: 38,
			swiperight: 39,
			swipedown: 40
		};

		Object.keys(touchEventsMap).forEach(
			(eventName: string): void => {
				scene.addEventListener(
					eventName,
					(event: CustomEvent): void => {
						this.respondToGesture(touchEventsMap[event.detail.eventName]);
					}
				);
			}
		);
	};

	private keyboardHandler = (e: KeyboardEvent): void => {
		if (this.isOver || !this.shape) {
			return;
		}

		this.respondToGesture(e.keyCode);
	};

	private respondToGesture = (code: number): void => {
		const area: matrix.Row[] = this.matrix;

		switch (code) {
			case 32:
				this.shape.goBottom(area);
				this.update();

				break;

			case 37:
				this.shape.goLeft(area);
				this.draw();

				break;

			case 38:
				this.shape.rotate(area);
				this.draw();

				break;

			case 39:
				this.shape.goRight(area);
				this.draw();

				break;

			case 40:
				this.shape.goDown(area);
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
		window.addEventListener('keydown', this.keyboardHandler.bind(this), false);
		btnRestart.addEventListener('click', this.restart.bind(this), false);
	};

	private drawShape = (): void => {
		this.shape = this.preparedShape || shapes.randomShape();
		this.preparedShape = shapes.randomShape();

		this.draw();

		this.tetrisCanvas.drawPreviewShape(this.preparedShape);
	};

	private draw = (): void => {
		this.tetrisCanvas.drawScene();
		this.tetrisCanvas.drawShape(this.shape);
		this.tetrisCanvas.drawMatrix(this.matrix);
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
			window.requestAnimationFrame(this.refresh.bind(this));
		}
	};

	private update = (): void => {
		if (this.shape.canMoveDown(this.matrix)) {
			this.shape.goDown(this.matrix);
		} else {
			this.shape.copyTo(this.matrix);

			this.setScore();
			this.drawShape();
		}

		this.draw();

		this.isOver = matrix.isOver(this.matrix);

		tetrisView.setGameOver(this.isOver);

		if (this.isOver) {
			tetrisView.setFinalScore(this.score);
		}
	};

	private setScore = (): void => {
		const rows: number[] = matrix.getFullRows(this.matrix);

		if (!rows.length) {
			return;
		}

		matrix.removeRows(this.matrix, rows);

		const score: number = matrix.getScore(rows);
		const reward: number = matrix.getReward(rows);

		this.score += score + reward;

		tetrisView.setScore(this.score);
		tetrisView.setReward(reward);
	};

	private setLevel = (): void => {
		const currentTime: number = new Date().getTime();

		if (currentTime - this.levelTime <= consts.LEVEL_INTERVAL) {
			return;
		}

		this.level += 1;
		this.interval = matrix.getInterval(this.level);

		tetrisView.setLevel(this.level);

		this.levelTime = currentTime;
	};
}
