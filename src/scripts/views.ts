import { ASIDE_WIDTH } from './consts';
import { IndexedList } from './shapes';

export default class TetrisView {
	private info: HTMLElement;
	private side: HTMLElement;
	private scene: HTMLCanvasElement;
	private score: HTMLElement;
	private level: HTMLElement;
	private reward: HTMLElement;
	private gameOver: HTMLElement;
	private container: HTMLElement;
	private finalScore: HTMLElement;
	private rewardInfo: HTMLElement;

	private maxWidth: number;
	private maxHeight: number;

	public preview: HTMLCanvasElement;
	public btnRestart: HTMLElement;

	constructor(size: IndexedList<number>, elements: IndexedList<HTMLElement | HTMLCanvasElement>) {
		this.info = elements.info;
		this.side = elements.side;
		this.scene = elements.scene as HTMLCanvasElement;
		this.score = elements.score;
		this.level = elements.level;
		this.reward = elements.reward;
		this.preview = elements.preview as HTMLCanvasElement;
		this.gameOver = elements.gameOver;
		this.container = elements.container;
		this.btnRestart = elements.btnRestart;
		this.rewardInfo = elements.rewardInfo;
		this.finalScore = elements.finalScore;

		this.maxWidth = size.width;
		this.maxHeight = size.height;

		this.init();
	}

	public init = (): void => {
		this.scene.focus();

		this.setLayout(this.container, this.maxWidth, this.maxHeight);

		this.rewardInfo.addEventListener('animationEnd', () => {
			this.rewardInfo.className = 'invisible';
		});
	};

	public setScore = (amount: number): void => {
		this.score.innerHTML = amount.toString();
	};

	public setFinalScore = (amount: number): void => {
		this.finalScore.innerHTML = amount.toString();
	};

	public setLevel = (lvl: number): void => {
		this.level.innerHTML = lvl.toString();
	};

	public setReward = (amount: number): void => {
		if (amount > 0) {
			this.reward.innerHTML = amount.toString();
			this.rewardInfo.className = 'fadeOutUp animated';
		} else {
			this.rewardInfo.className = 'invisible';
		}
	};

	public setGameOver = (isOver: boolean): void => {
		this.gameOver.style.display = isOver ? 'block' : 'none';
	};

	private getContainerSize = (maxWidth: number, maxHeight: number): IndexedList<number> => {
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

	private setLayout = (container: HTMLElement, maxWidth: number, maxHeight: number): void => {
		const size: IndexedList<number> = this.getContainerSize(maxWidth, maxHeight);
		const style: CSSStyleDeclaration = container.style;

		style.width = size.width + 'px';
		style.height = size.height + 'px';

		this.scene.height = size.height;
		this.scene.width = this.scene.height / 2;

		const sideWidth: number = size.width - this.scene.width;

		this.side.style.width = sideWidth + 'px';

		if (sideWidth < ASIDE_WIDTH) {
			this.info.style.width = this.side.style.width;
		}

		this.preview.width = 80;
		this.preview.height = 80;

		this.gameOver.style.width = this.scene.width + 'px';
	};
}
