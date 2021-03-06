export declare type Row = number[];
export declare const init: (rows: number, cols: number) => Row[];
export declare const clear: (matrix: Row[]) => Row[];
export declare const getFullRows: (matrix: Row[]) => number[];
export declare const removeRow: (matrix: Row[], index: number) => void;
export declare const removeRows: (matrix: Row[], rows: Row) => void;
export declare const isOver: (matrix: Row[]) => boolean;
export declare const getReward: (rows: number[]) => number;
export declare const getScore: (rows: number[]) => number;
export declare const getInterval: (level: number) => number;
