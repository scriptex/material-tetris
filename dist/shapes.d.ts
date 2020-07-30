import { Row } from './matrix.js';
export interface Point {
    x: number;
    y: number;
}
export interface IndexedList<T> {
    [key: string]: T;
}
export declare const canMove: (shape: Shape, matrix: Row[], action: string) => boolean;
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
    rotate: (matrix: Row[]) => void;
    getColumnCount: () => number;
    getRowCount: () => number;
    getNextState: () => number;
    canMoveDown: (matrix: Row[]) => boolean;
    goDown: (matrix: Row[]) => void;
    goBottom: (matrix: Row[]) => void;
    goLeft: (matrix: Row[]) => void;
    goRight: (matrix: Row[]) => void;
    copyTo: (matrix: Row[]) => void;
    getMatrix: (state?: number) => Row[];
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
