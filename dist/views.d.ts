import { IndexedList } from './shapes.js';
export default class TetrisView {
    private info;
    private side;
    private scene;
    private score;
    private level;
    private reward;
    private gameOver;
    private container;
    private finalScore;
    private rewardInfo;
    private maxWidth;
    private maxHeight;
    preview: HTMLCanvasElement;
    btnRestart: HTMLElement;
    constructor(size: IndexedList<number>, elements: IndexedList<HTMLElement | any>);
    init: () => void;
    setScore: (amount: number) => void;
    setFinalScore: (amount: number) => void;
    setLevel: (lvl: number) => void;
    setReward: (amount: number) => void;
    setGameOver: (isOver: boolean) => void;
    private getContainerSize;
    private setLayout;
}
