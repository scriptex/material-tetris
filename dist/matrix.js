import { DEFAULT_INTERVAL } from './consts.js';
export const init = (rows, cols) => [...Array(rows).keys()].map(() => [...Array(cols).keys()].map(() => 0));
export const clear = (matrix) => matrix.map((row) => {
    row.map((col) => {
        col = 0;
        return col;
    });
    return row;
});
export const getFullRows = (matrix) => matrix
    .map((row, i) => {
    const isFull = row.indexOf(0) === -1;
    if (isFull) {
        return i;
    }
})
    .filter(Boolean);
export const removeRow = (matrix, index) => {
    const cols = matrix[0].length;
    for (let i = index; i >= 0; i--) {
        for (let j = 0; j < cols; j++) {
            if (i > 0) {
                matrix[i][j] = matrix[i - 1][j];
            }
            else {
                matrix[i][j] = 0;
            }
        }
    }
};
export const removeRows = (matrix, rows) => {
    rows.forEach((row) => removeRow(matrix, row));
};
export const isOver = (matrix) => matrix[0].filter((col) => col !== 0).length > 0;
export const getReward = (rows) => (rows && rows.length > 1 ? Math.pow(2, rows.length - 1) * 100 : 0);
export const getScore = (rows) => (rows && rows.length ? rows.length * 100 : 0);
export const getInterval = (level) => DEFAULT_INTERVAL - (level - 1) * 60;
