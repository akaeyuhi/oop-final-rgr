import { IRow, Row } from './Row';
import { Cell } from './Cell';
import DataCell from './DataCell';

export default class DataRow extends Row implements IRow {
  cells: Cell[] = [];

  constructor(cells: string[]) {
    super(cells);
    this.parseCells();
  }

  parseCells(this: DataRow): any {
    this.cells = this.rawCells.map((cell) => new DataCell(cell));
  }

  render(this: DataRow): string {
    return `<tr>${this.cells.map((cell) => cell.render()).join('\n')}</tr>`;
  }
}
