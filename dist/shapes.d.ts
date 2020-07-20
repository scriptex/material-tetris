import { Row } from './matrix.js';
export interface Point {
    x: number;
    y: number;
}
export interface IndexedList<T> {
    [key: string]: T;
}
export declare const canMove: (shape: Shape, matrix: number[][], action: string) => boolean;
export declare class Shape {
    x: number;
    y: number;
    flag: string;
    color: string;
    state: number;
    states: Row[][];
    content: IndexedList<Point[]>;
    init: () => void;
    getContent: (state: number) => Point[];
    rotate: (matrix: number[][]) => void;
    getColumnCount: () => number;
    getRowCount: () => number;
    getNextState: () => number;
    canMoveDown: (matrix: number[][]) => boolean;
    goDown: (matrix: number[][]) => void;
    goBottom: (matrix: number[][]) => void;
    goLeft: (matrix: number[][]) => void;
    goRight: (matrix: number[][]) => void;
    copyTo: (matrix: number[][]) => void;
    getMatrix: (state?: number) => number[][];
    getRightPosition: () => number;
}
export declare class ShapeL extends Shape {
    constructor();
}
export declare class ShapeLR extends Shape {
    constructor();
}
export declare class ShapeO extends Shape {
    constructor();
}
export declare class ShapeI extends Shape {
    constructor();
}
export declare class ShapeT extends Shape {
    constructor();
}
export declare const randomShape: () => Shape;
