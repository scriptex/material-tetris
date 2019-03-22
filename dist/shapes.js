import { COLORS, COLUMN_COUNT } from './consts.js';
export const canMove = (shape, matrix, action) => {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const pointCanMove = (point) => {
        let x = shape.x + point.x;
        let y = shape.y + point.y;
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
    const points = action === 'rotate' ? shape.getContent(shape.getNextState()) : shape.getContent(shape.state);
    for (const i in points) {
        if (!pointCanMove(points[i])) {
            return false;
        }
    }
    return true;
};
export class Shape {
    constructor() {
        this.init = () => {
            this.y = 0;
            this.color = COLORS[Math.floor(Math.random() * 7)];
            this.state = 0;
            this.content = {};
        };
        this.getContent = (state) => {
            const points = this.content[state] || [];
            if (points.length) {
                return points;
            }
            const matrix = this.getMatrix(state);
            for (let i = 0; i < matrix.length; i++) {
                const row = matrix[i];
                for (let j = 0; j < row.length; j++) {
                    if (row[j] === 1) {
                        points.push({ x: j, y: i });
                    }
                }
            }
            this.content[state] = points;
            return points;
        };
        this.rotate = (matrix) => {
            if (!canMove(this, matrix, 'rotate')) {
                return;
            }
            this.state = this.getNextState();
            const right = this.getRightPosition();
            if (right >= COLUMN_COUNT) {
                this.x -= right - COLUMN_COUNT + 1;
            }
        };
        this.getColumnCount = () => {
            const matrix = this.getMatrix();
            let columnCount = 0;
            for (const row of matrix) {
                columnCount = Math.max(columnCount, row.length);
            }
            return columnCount;
        };
        this.getRowCount = () => this.getMatrix().length;
        this.getNextState = () => (this.state + 1) % this.states.length;
        this.canMoveDown = (matrix) => canMove(this, matrix, 'down');
        this.goDown = (matrix) => {
            if (!canMove(this, matrix, 'down')) {
                return;
            }
            this.y += 1;
        };
        this.goBottom = (matrix) => {
            while (canMove(this, matrix, 'down')) {
                this.y += 1;
            }
        };
        this.goLeft = (matrix) => {
            if (!canMove(this, matrix, 'left')) {
                return;
            }
            this.x -= 1;
        };
        this.goRight = (matrix) => {
            if (!canMove(this, matrix, 'right')) {
                return;
            }
            this.x += 1;
        };
        this.copyTo = (matrix) => {
            const ownMatrix = this.getMatrix();
            for (let i = 0; i < ownMatrix.length; i++) {
                const row = ownMatrix[i];
                for (let j = 0; j < row.length; j++) {
                    if (row[j] !== 1) {
                        continue;
                    }
                    const x = this.x + j;
                    const y = this.y + i;
                    if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                        matrix[y][x] = this.color;
                    }
                }
            }
        };
        this.getMatrix = (state = this.state) => this.states[state];
        this.getRightPosition = () => {
            const points = this.getContent(this.state);
            let right = 0;
            for (const point of points) {
                right = Math.max(point.x, right);
            }
            return this.x + right;
        };
    }
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
    let shape;
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
