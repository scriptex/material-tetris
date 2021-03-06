import * as shapes from './shapes.js';
import TouchSweep from './touchswipe.js';
export declare const defaults: shapes.IndexedList<number>;
export default class Tetris {
    touchSwipeInstance: TouchSweep;
    private level;
    private score;
    private shape;
    private matrix;
    private isOver;
    private running;
    private interval;
    private startTime;
    private currentTime;
    private prevTime;
    private levelTime;
    private container;
    private tetrisView;
    private tetrisCanvas;
    private preparedShape;
    constructor(id: string);
    start: () => void;
    pause: () => void;
    private init;
    private reset;
    private touchHandler;
    private keyboardHandler;
    private respondToGesture;
    private restart;
    private addEventListeners;
    private drawShape;
    private draw;
    private refresh;
    private update;
    private setScore;
    private setLevel;
}
