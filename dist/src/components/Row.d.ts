import { ICell } from './Cell';
export interface IRow {
    cells: ICell[];
    parseCells(): any;
    render(): string;
    pushNullCell(): void;
    textCells: string[];
}
export declare abstract class Row implements IRow {
    abstract cells: ICell[];
    protected rawCells: string[];
    protected constructor(row: string[]);
    abstract parseCells(): any;
    abstract render(): string;
    pushNullCell(): void;
    get textCells(): string[];
}
