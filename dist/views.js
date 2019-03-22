import { ASIDE_WIDTH } from './consts.js';
export const $ = (id) => document.getElementById(id);
export const scene = $('scene');
export const side = $('side');
export const info = $('info');
export const preview = $('preview');
export const level = $('level');
export const score = $('score');
export const rewardInfo = $('rewardInfo');
export const reward = $('reward');
export const gameOver = $('gameOver');
export const btnRestart = $('restart');
export const finalScore = $('finalScore');
export const getContainerSize = (maxWidth, maxHeight) => {
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
const setLayout = (container, maxWidth, maxHeight) => {
    const size = getContainerSize(maxWidth, maxHeight);
    const style = container.style;
    style.width = size.width + 'px';
    style.height = size.height + 'px';
    scene.height = size.height;
    scene.width = scene.height / 2;
    const sideWidth = size.width - scene.width;
    side.style.width = sideWidth + 'px';
    if (sideWidth < ASIDE_WIDTH) {
        info.style.width = side.style.width;
    }
    preview.width = 80;
    preview.height = 80;
    gameOver.style.width = scene.width + 'px';
};
export const tetrisView = {
    init: function (id, maxWidth, maxHeight) {
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
    setScore: (amount) => {
        score.innerHTML = amount.toString();
    },
    setFinalScore: (amount) => {
        finalScore.innerHTML = amount.toString();
    },
    setLevel: (lvl) => {
        level.innerHTML = lvl.toString();
    },
    setReward: (amount) => {
        if (amount > 0) {
            reward.innerHTML = amount.toString();
            rewardInfo.className = 'fadeOutUp animated';
        }
        else {
            rewardInfo.className = 'invisible';
        }
    },
    setGameOver: (isOver) => {
        gameOver.style.display = isOver ? 'block' : 'none';
    }
};
