import { IRow, Row } from './Row';
import { Cell } from './Cell';
export default class DataRow extends Row implements IRow {
    cells: Cell[];
    constructor(cells: string[]);
    parseCells(this: DataRow): any;
    render(this: DataRow): string;
}
