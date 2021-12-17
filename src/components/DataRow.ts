import Row from "./Row";
import Cell from "./Cell";
import DataCell from "./DataCell";

export default class DataRow extends Row {
    cells: Array<Cell> = [];

    constructor(cells: Array<string>) {
        super(cells);
        this.parseCells();
    }

    parseCells(): any {
        this.cells = this.rawCells.map(cell => new DataCell(cell));
    }

    render(): string {
        return `<tr>${this.cells.map(cell => cell.render()).join('\n')}</tr>`;
    }

}