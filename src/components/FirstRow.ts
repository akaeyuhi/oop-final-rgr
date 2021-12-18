import { IRow, Row } from './Row';
import { ICell } from './Cell';
import SortCell from './SortCell';

export default class FirstRow extends Row implements IRow {
  cells: ICell[] = [];

  constructor(row: string[]) {
    super(row);
    this.parseCells();
  }

  parseCells(this: FirstRow): any {
    this.cells = this.rawCells.map((cell) => new SortCell(cell));
    if (this.cells[0].data !== '№') {
      this.cells.unshift(new SortCell('№'));
    }
  }
  render(this: FirstRow): string {
    return `<tr id="sort">${this.cells.map((cell) => cell.render()).join('\n')}</tr>`;
  }
}
