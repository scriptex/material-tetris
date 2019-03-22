import { Row } from './matrix.js';
import { COLORS, COLUMN_COUNT } from './consts.js';

export interface Point {
	x: number;
	y: number;
}

export interface IndexedList<T> {
	[key: string]: T;
}

export const canMove = (shape: Shape, matrix: Row[], action: string): boolean => {
	const rows: number = matrix.length;
	const cols: number = matrix[0].length;

	const pointCanMove = (point: Point): boolean => {
		let x: number = shape.x + point.x;
		let y: number = shape.y + point.y;

		if (y < 0) {
			return true;
		}

		if (action === 'left') {
			x -= 1;

			return x >= 0 && x < cols && matrix[y][x] === 0;
		}

		if (action === 'right') {
			x += 1;

			return x >= 0 && x < cols && matrix[y][x] === 0;
		}

		if (action === 'down') {
			y += 1;

			return y < rows && matrix[y][x] === 0;
		}

		if (action === 'rotate') {
			return y < rows && !matrix[y][x];
		}
	};

	// prettier-ignore
	const points: Point[] = action === 'rotate' ? shape.getContent(shape.getNextState()) : shape.getContent(shape.state);

	for (const i in points) {
		if (!pointCanMove(points[i])) {
			return false;
		}
	}

	return true;
};

export class Shape {
	public x: number;
	public y: number;
	public flag: string;
	public color: string;
	public state: number;
	public states: Row[][];
	public content: IndexedList<Point[]>;

	public init = (): void => {
		this.y = 0;
		this.color = COLORS[Math.floor(Math.random() * 7)];
		this.state = 0;
		this.content = {};
	};

	public getContent = (state: number): Point[] => {
		const points: Point[] = this.content[state] || [];

		if (points.length) {
			return points;
		}

		const matrix: Row[] = this.getMatrix(state);

		for (let i: number = 0; i < matrix.length; i++) {
			const row: Row = matrix[i];

			for (let j: number = 0; j < row.length; j++) {
				if (row[j] === 1) {
					points.push({ x: j, y: i });
				}
			}
		}

		this.content[state] = points;

		return points;
	};

	public rotate = (matrix: Row[]): void => {
		if (!canMove(this, matrix, 'rotate')) {
			return;
		}

		this.state = this.getNextState();

		const right = this.getRightPosition();

		if (right >= COLUMN_COUNT) {
			this.x -= right - COLUMN_COUNT + 1;
		}
	};

	public getColumnCount = (): number => {
		const matrix: Row[] = this.getMatrix();

		let columnCount: number = 0;

		for (const row of matrix) {
			columnCount = Math.max(columnCount, row.length);
		}

		return columnCount;
	};

	public getRowCount = (): number => this.getMatrix().length;

	public getNextState = (): number => (this.state + 1) % this.states.length;

	public canMoveDown = (matrix: Row[]): boolean => canMove(this, matrix, 'down');

	public goDown = (matrix: Row[]): void => {
		if (!canMove(this, matrix, 'down')) {
			return;
		}

		this.y += 1;
	};

	public goBottom = (matrix: Row[]): void => {
		while (canMove(this, matrix, 'down')) {
			this.y += 1;
		}
	};

	public goLeft = (matrix: Row[]): void => {
		if (!canMove(this, matrix, 'left')) {
			return;
		}

		this.x -= 1;
	};

	public goRight = (matrix: Row[]): void => {
		if (!canMove(this, matrix, 'right')) {
			return;
		}

		this.x += 1;
	};

	public copyTo = (matrix: Row[]): void => {
		const ownMatrix: Row[] = this.getMatrix();

		for (let i: number = 0; i < ownMatrix.length; i++) {
			const row: Row = ownMatrix[i];

			for (let j: number = 0; j < row.length; j++) {
				if (row[j] !== 1) {
					continue;
				}

				const x: number = this.x + j;
				const y: number = this.y + i;

				if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
					matrix[y][x] = this.color as any;
				}
			}
		}
	};

	public getMatrix = (state: number = this.state): Row[] => this.states[state];

	public getRightPosition = () => {
		const points: Point[] = this.getContent(this.state);

		let right = 0;

		for (const point of points) {
			right = Math.max(point.x, right);
		}

		return this.x + right;
	};
}

export class ShapeL extends Shape {
	constructor() {
		super();

		this.x = 4;
		this.y = -3;
		this.flag = 'L';
		this.states = [
			[[1, 0], [1, 0], [1, 1]],
			[[0, 0, 1], [1, 1, 1]],
			[[1, 1], [0, 1], [0, 1]],
			[[1, 1, 1], [1, 0, 0]]
		];
	}
}

export class ShapeLR extends Shape {
	constructor() {
		super();

		this.x = 4;
		this.y = -3;
		this.flag = 'LR';
		this.states = [
			[[0, 1], [0, 1], [1, 1]],
			[[1, 1, 1], [0, 0, 1]],
			[[1, 1], [1, 0], [1, 0]],
			[[1, 0, 0], [1, 1, 1]]
		];
	}
}

export class ShapeO extends Shape {
	constructor() {
		super();

		this.x = 4;
		this.y = -2;
		this.flag = 'O';
		this.states = [[[1, 1], [1, 1]]];
	}
}

export class ShapeI extends Shape {
	constructor() {
		super();

		this.x = 5;
		this.y = -4;
		this.flag = 'I';
		this.states = [[[1], [1], [1], [1]], [[1, 1, 1, 1]]];
	}
}

export class ShapeT extends Shape {
	constructor() {
		super();

		this.x = 4;
		this.y = -2;
		this.flag = 'T';
		this.states = [
			[[1, 1, 1], [0, 1, 0]],
			[[1, 0], [1, 1], [1, 0]],
			[[0, 1, 0], [1, 1, 1]],
			[[0, 1], [1, 1], [0, 1]]
		];
	}
}

class ShapeZ extends Shape {
	constructor() {
		super();

		this.x = 4;
		this.y = -2;
		this.flag = 'Z';
		this.states = [[[1, 1, 0], [0, 1, 1]], [[0, 1], [1, 1], [1, 0]]];
	}
}

class ShapeZR extends Shape {
	constructor() {
		super();

		this.x = 4;
		this.y = -2;
		this.flag = 'ZR';
		this.states = [[[0, 1, 1], [1, 1, 0]], [[1, 0], [1, 1], [0, 1]]];
	}
}

export const randomShape = () => {
	const result = Math.floor(Math.random() * 7);

	let shape: Shape;

	switch (result) {
		case 0:
			shape = new ShapeL();
			break;
		case 1:
			shape = new ShapeO();
			break;
		case 2:
			shape = new ShapeZ();
			break;
		case 3:
			shape = new ShapeT();
			break;
		case 4:
			shape = new ShapeLR();
			break;
		case 5:
			shape = new ShapeZR();
			break;
		case 6:
			shape = new ShapeI();
			break;
	}

	shape.init();

	return shape;
};
