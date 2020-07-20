import { Shape } from './shapes.js';
export default class TetrisCanvas {
    private scene;
    private preview;
    private sceneContext;
    private previewContext;
    private gridSize;
    private previewGridSize;
    constructor(scene: HTMLCanvasElement, preview: HTMLCanvasElement);
    drawScene: () => void;
    drawPreview: () => void;
    drawMatrix: (matrix: number[][]) => void;
    drawShape: (shape: Shape) => void;
    drawPreviewShape: (shape: Shape) => void;
    private clearScene;
    private clearPreview;
    private drawLine;
    private drawGrids;
    private drawPoint;
}
