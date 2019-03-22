import { Point, Shape } from './shapes.js';
export declare const drawLine: (ctx: CanvasRenderingContext2D, p1: Point, p2: Point, color: string) => void;
export declare const drawGrids: (canvas: HTMLCanvasElement, size: number, cols: number, rows: number, color1: string, color2: string) => void;
export declare const drawPoint: (ctx: CanvasRenderingContext2D, color: string, x: number, y: number, size: number) => void;
export declare const tetrisCanvas: {
    init: (scene: HTMLCanvasElement, preview: HTMLCanvasElement) => void;
    clearScene: () => void;
    clearPreview: () => void;
    drawScene: () => void;
    drawMatrix: (matrix: number[][]) => void;
    drawPreview: () => void;
    drawShape: (shape: Shape) => void;
    drawPreviewShape: (shape: Shape) => void;
};
