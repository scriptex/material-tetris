import { ASIDE_WIDTH } from './consts.js';
export default class TetrisView {
    constructor(size, elements) {
        this.init = () => {
            this.scene.focus();
            this.setLayout(this.container, this.maxWidth, this.maxHeight);
            this.rewardInfo.addEventListener('animationEnd', () => {
                this.rewardInfo.className = 'invisible';
            });
        };
        this.setScore = (amount) => {
            this.score.innerHTML = amount.toString();
        };
        this.setFinalScore = (amount) => {
            this.finalScore.innerHTML = amount.toString();
        };
        this.setLevel = (lvl) => {
            this.level.innerHTML = lvl.toString();
        };
        this.setReward = (amount) => {
            if (amount > 0) {
                this.reward.innerHTML = amount.toString();
                this.rewardInfo.className = 'fadeOutUp animated';
            }
            else {
                this.rewardInfo.className = 'invisible';
            }
        };
        this.setGameOver = (isOver) => {
            this.gameOver.style.display = isOver ? 'block' : 'none';
        };
        this.getContainerSize = (maxWidth, maxHeight) => {
            const { clientWidth, clientHeight } = document.documentElement;
            const size = {};
            if (clientWidth > clientHeight) {
                size.height = Math.min(maxHeight, clientHeight);
                size.width = Math.min(size.height / 2 + ASIDE_WIDTH, maxWidth);
            }
            else {
                size.width = Math.min(maxWidth, clientWidth);
                size.height = Math.min(maxHeight, clientHeight);
            }
            return size;
        };
        this.setLayout = (container, maxWidth, maxHeight) => {
            const size = this.getContainerSize(maxWidth, maxHeight);
            const style = container.style;
            style.width = size.width + 'px';
            style.height = size.height + 'px';
            this.scene.height = size.height;
            this.scene.width = this.scene.height / 2;
            const sideWidth = size.width - this.scene.width;
            this.side.style.width = sideWidth + 'px';
            if (sideWidth < ASIDE_WIDTH) {
                this.info.style.width = this.side.style.width;
            }
            this.preview.width = 80;
            this.preview.height = 80;
            this.gameOver.style.width = this.scene.width + 'px';
        };
        this.info = elements.info;
        this.side = elements.side;
        this.scene = elements.scene;
        this.score = elements.score;
        this.level = elements.level;
        this.reward = elements.reward;
        this.preview = elements.preview;
        this.gameOver = elements.gameOver;
        this.container = elements.container;
        this.btnRestart = elements.btnRestart;
        this.rewardInfo = elements.rewardInfo;
        this.finalScore = elements.finalScore;
        this.maxWidth = size.width;
        this.maxHeight = size.height;
        this.init();
    }
}
