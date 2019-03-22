import { ASIDE_WIDTH } from './consts.js';
import { IndexedList } from './shapes.js';

export const $ = (id: string): HTMLElement | HTMLCanvasElement | null => document.getElementById(id);

export const scene: any = $('scene');
export const side: HTMLElement = $('side');
export const info: HTMLElement = $('info');
export const preview: any = $('preview');
export const level: HTMLElement = $('level');
export const score: HTMLElement = $('score');
export const rewardInfo: HTMLElement = $('rewardInfo');
export const reward: HTMLElement = $('reward');
export const gameOver: HTMLElement = $('gameOver');
export const btnRestart: HTMLElement = $('restart');
export const finalScore: HTMLElement = $('finalScore');

export const getContainerSize = (maxWidth: number, maxHeight: number): IndexedList<number> => {
	const { clientWidth, clientHeight } = document.documentElement;
	const size: IndexedList<number> = {};

	if (clientWidth > clientHeight) {
		size.height = Math.min(maxHeight, clientHeight);
		size.width = Math.min(size.height / 2 + ASIDE_WIDTH, maxWidth);
	} else {
		size.width = Math.min(maxWidth, clientWidth);
		size.height = Math.min(maxHeight, clientHeight);
	}

	return size;
};

const setLayout = (container: HTMLElement, maxWidth: number, maxHeight: number): void => {
	const size: IndexedList<number> = getContainerSize(maxWidth, maxHeight);
	const style: CSSStyleDeclaration = container.style;

	style.width = size.width + 'px';
	style.height = size.height + 'px';

	scene.height = size.height;
	scene.width = scene.height / 2;

	const sideWidth: number = size.width - scene.width;

	side.style.width = sideWidth + 'px';

	if (sideWidth < ASIDE_WIDTH) {
		info.style.width = side.style.width;
	}

	preview.width = 80;
	preview.height = 80;

	gameOver.style.width = scene.width + 'px';
};

export const tetrisView = {
	init: function(id: string, maxWidth: number, maxHeight: number): void {
		this.container = $(id);
		this.scene = scene;
		this.preview = preview;
		this.btnRestart = btnRestart;

		setLayout(this.container, maxWidth, maxHeight);

		this.scene.focus();

		rewardInfo.addEventListener('animationEnd', () => {
			rewardInfo.className = 'invisible';
		});
	},
	setScore: (amount: number): void => {
		score.innerHTML = amount.toString();
	},
	setFinalScore: (amount: number): void => {
		finalScore.innerHTML = amount.toString();
	},
	setLevel: (lvl: number): void => {
		level.innerHTML = lvl.toString();
	},
	setReward: (amount: number): void => {
		if (amount > 0) {
			reward.innerHTML = amount.toString();
			rewardInfo.className = 'fadeOutUp animated';
		} else {
			rewardInfo.className = 'invisible';
		}
	},
	setGameOver: (isOver: boolean): void => {
		gameOver.style.display = isOver ? 'block' : 'none';
	}
};
