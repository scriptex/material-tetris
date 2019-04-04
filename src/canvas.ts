import { Row } from './matrix.js';
import { Point, Shape } from './shapes.js';
import * as constants from './consts.js';

export default class TetrisCanvas {
	private scene: HTMLCanvasElement;
	private preview: HTMLCanvasElement;
	private sceneContext: CanvasRenderingContext2D;
	private previewContext: CanvasRenderingContext2D;
	private gridSize: number;
	private previewGridSize: number;

	constructor(scene: HTMLCanvasElement, preview: HTMLCanvasElement) {
		this.scene = scene;
		this.preview = preview;
		this.sceneContext = scene.getContext('2d');
		this.previewContext = preview.getContext('2d');
		this.gridSize = scene.width / constants.COLUMN_COUNT;
		this.previewGridSize = preview.width / constants.PREVIEW_COUNT;

		this.drawScene();
	}

	public drawScene = (): void => {
		this.clearScene();

		this.drawGrids(
			this.scene,
			this.gridSize,
			constants.COLUMN_COUNT,
			constants.ROW_COUNT,
			constants.SCENE_BG_START,
			constants.SCENE_BG_END
		);
	};

	public drawPreview = (): void => {
		this.drawGrids(
			this.preview,
			this.previewGridSize,
			constants.PREVIEW_COUNT,
			constants.PREVIEW_COUNT,
			constants.PREVIEW_BG,
			constants.PREVIEW_BG
		);
	};

	public drawMatrix = (matrix: Row[]): void => {
		for (let i: number = 0; i < matrix.length; i++) {
			const row: Row = matrix[i];

			for (let j: number = 0; j < row.length; j++) {
				if (row[j] === 0) {
					continue;
				}

				this.drawPoint(this.sceneContext, row[j] as any, j * this.gridSize, i * this.gridSize, this.gridSize);
			}
		}
	};

	public drawShape = (shape: Shape): void => {
		if (!shape) {
			return;
		}

		const matrix: Row[] = shape.getMatrix();
		const size = this.gridSize;

		for (let i: number = 0; i < matrix.length; i++) {
			for (let j: number = 0; j < matrix[i].length; j++) {
				const value: number = matrix[i][j];

				if (value !== 1) {
					continue;
				}

				const x: number = size * (shape.x + j);
				const y: number = size * (shape.y + i);

				this.drawPoint(this.sceneContext, shape.color, x, y, size);
			}
		}
	};

	public drawPreviewShape = (shape: Shape): void => {
		if (!shape) {
			return;
		}

		this.clearPreview();

		const size: number = this.previewGridSize;
		const matrix: Row[] = shape.getMatrix();
		const startX: number = (this.preview.width - size * shape.getColumnCount()) / 2;
		const startY: number = (this.preview.height - size * shape.getRowCount()) / 2;

		for (let i: number = 0; i < matrix.length; i++) {
			for (let j: number = 0; j < matrix[i].length; j++) {
				const value: number = matrix[i][j];

				if (value !== 1) {
					continue;
				}

				const x: number = startX + size * j;
				const y: number = startY + size * i;

				this.drawPoint(this.previewContext, shape.color, x, y, size);
			}
		}
	};

	private clearScene = (): void => {
		this.sceneContext.clearRect(0, 0, this.scene.width, this.scene.height);
	};

	private clearPreview = (): void => {
		this.previewContext.clearRect(0, 0, this.preview.width, this.preview.height);
	};

	private drawLine = (ctx: CanvasRenderingContext2D, p1: Point, p2: Point, color: string): void => {
		ctx.beginPath();

		ctx.moveTo(p1.x, p1.y);
		ctx.lineTo(p2.x, p2.y);

		ctx.lineWidth = 1;
		ctx.strokeStyle = color;

		ctx.stroke();
		ctx.closePath();
	};

	private drawGrids = (
		canvas: HTMLCanvasElement,
		size: number,
		cols: number,
		rows: number,
		color1: string,
		color2: string
	): void => {
		const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
		const width: number = canvas.width;
		const height: number = canvas.height;

		ctx.rect(0, 0, width, height);

		const gradient: CanvasGradient = ctx.createLinearGradient(0, 0, 0, height);

		gradient.addColorStop(0, color1);
		gradient.addColorStop(1, color2);

		ctx.fillStyle = gradient;
		ctx.fill();

		for (let i: number = 1; i < cols; i++) {
			const x = size * i + 0.5;

			this.drawLine(ctx, { x, y: 0 }, { x, y: height }, constants.GRID_LINE_COLOR);
		}

		for (let i: number = 1; i < rows; i++) {
			const y = size * i + 0.5;

			this.drawLine(ctx, { x: 0, y }, { x: width, y }, constants.GRID_LINE_COLOR);
		}
	};

	private drawPoint = (ctx: CanvasRenderingContext2D, color: string, x: number, y: number, size: number): void => {
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
}
