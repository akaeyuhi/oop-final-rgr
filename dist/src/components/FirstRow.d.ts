import { IRow, Row } from './Row';
import { ICell } from './Cell';
export default class FirstRow extends Row implements IRow {
    cells: ICell[];
    constructor(row: string[]);
    parseCells(this: FirstRow): any;
    render(this: FirstRow): string;
}
