import { DEFAULT_INTERVAL } from './consts';

export type Row = number[];

export const init = (rows: number, cols: number): Row[] =>
	[...Array(rows).keys()].map(() => [...Array(cols).keys()].map(() => 0));

export const clear = (matrix: Row[]): Row[] => matrix.map((row: Row) => Array(row.length).fill(0));

export const getFullRows = (matrix: Row[]): number[] =>
	matrix
		.map((row: Row, i: number) => {
			const isFull: boolean = row.indexOf(0) === -1;

			if (isFull) {
				return i;
			}

			return -1;
		})
		.filter(item => item >= 0);

export const removeRow = (matrix: Row[], index: number): void => {
	const cols: number = matrix[0].length;

	for (let i: number = index; i >= 0; i--) {
		for (let j: number = 0; j < cols; j++) {
			if (i > 0) {
				matrix[i][j] = matrix[i - 1][j];
			} else {
				matrix[i][j] = 0;
			}
		}
	}
};

export const removeRows = (matrix: Row[], rows: Row): void => {
	rows.forEach((row: number) => removeRow(matrix, row));
};

export const isOver = (matrix: Row[]): boolean => matrix[0].filter((col: number) => col !== 0).length > 0;

export const getReward = (rows: number[]): number => (rows && rows.length > 1 ? Math.pow(2, rows.length - 1) * 100 : 0);

export const getScore = (rows: number[]): number => (rows && rows.length ? rows.length * 100 : 0);

export const getInterval = (level: number): number => DEFAULT_INTERVAL - (level - 1) * 60;
