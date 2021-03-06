import * as constants from './consts.js';
export default class TetrisCanvas {
    constructor(scene, preview) {
        this.drawScene = () => {
            this.clearScene();
            this.drawGrids(this.scene, this.gridSize, constants.COLUMN_COUNT, constants.ROW_COUNT, constants.SCENE_BG_START, constants.SCENE_BG_END);
        };
        this.drawPreview = () => {
            this.drawGrids(this.preview, this.previewGridSize, constants.PREVIEW_COUNT, constants.PREVIEW_COUNT, constants.PREVIEW_BG, constants.PREVIEW_BG);
        };
        this.drawMatrix = (matrix) => {
            for (let i = 0; i < matrix.length; i++) {
                const row = matrix[i];
                for (let j = 0; j < row.length; j++) {
                    if (row[j] === 0) {
                        continue;
                    }
                    this.drawPoint(this.sceneContext, row[j], j * this.gridSize, i * this.gridSize, this.gridSize);
                }
            }
        };
        this.drawShape = (shape) => {
            if (!shape) {
                return;
            }
            const matrix = shape.getMatrix();
            const size = this.gridSize;
            for (let i = 0; i < matrix.length; i++) {
                for (let j = 0; j < matrix[i].length; j++) {
                    const value = matrix[i][j];
                    if (value !== 1) {
                        continue;
                    }
                    const x = size * (shape.x + j);
                    const y = size * (shape.y + i);
                    this.drawPoint(this.sceneContext, shape.color, x, y, size);
                }
            }
        };
        this.drawPreviewShape = (shape) => {
            if (!shape) {
                return;
            }
            this.clearPreview();
            const size = this.previewGridSize;
            const matrix = shape.getMatrix();
            const startX = (this.preview.width - size * shape.getColumnCount()) / 2;
            const startY = (this.preview.height - size * shape.getRowCount()) / 2;
            for (let i = 0; i < matrix.length; i++) {
                for (let j = 0; j < matrix[i].length; j++) {
                    const value = matrix[i][j];
                    if (value !== 1) {
                        continue;
                    }
                    const x = startX + size * j;
                    const y = startY + size * i;
                    this.drawPoint(this.previewContext, shape.color, x, y, size);
                }
            }
        };
        this.clearScene = () => {
            this.sceneContext.clearRect(0, 0, this.scene.width, this.scene.height);
        };
        this.clearPreview = () => {
            this.previewContext.clearRect(0, 0, this.preview.width, this.preview.height);
        };
        this.drawLine = (ctx, p1, p2, color) => {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineWidth = 1;
            ctx.strokeStyle = color;
            ctx.stroke();
            ctx.closePath();
        };
        this.drawGrids = (canvas, size, cols, rows, color1, color2) => {
            const ctx = canvas.getContext('2d');
            const width = canvas.width;
            const height = canvas.height;
            ctx.rect(0, 0, width, height);
            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, color1);
            gradient.addColorStop(1, color2);
            ctx.fillStyle = gradient;
            ctx.fill();
            for (let i = 1; i < cols; i++) {
                const x = size * i + 0.5;
                this.drawLine(ctx, { x, y: 0 }, { x, y: height }, constants.GRID_LINE_COLOR);
            }
            for (let i = 1; i < rows; i++) {
                const y = size * i + 0.5;
                this.drawLine(ctx, { x: 0, y }, { x: width, y }, constants.GRID_LINE_COLOR);
            }
        };
        this.drawPoint = (ctx, color, x, y, size) => {
            if (y < 0) {
                return;
            }
            ctx.beginPath();
            ctx.rect(x, y, size, size);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeStyle = constants.BOX_BORDER_COLOR;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.closePath();
        };
        this.scene = scene;
        this.preview = preview;
        this.sceneContext = scene.getContext('2d');
        this.previewContext = preview.getContext('2d');
        this.gridSize = scene.width / constants.COLUMN_COUNT;
        this.previewGridSize = preview.width / constants.PREVIEW_COUNT;
        this.drawScene();
    }
}
