import Row from './Row';
import Cell from './Cell';
import SortCell from './SortCell';

export default class FirstRow extends Row {
  cells: Array<Cell> = [];

  constructor(row: Array<string>) {
    super(row);
    this.parseCells();
  }

  parseCells(): any {
    this.cells = this.rawCells.map((cell) => new SortCell(cell));
    if (this.cells[0].data !== '№') {
      this.cells.unshift(new SortCell('№'));
    }
  }
  render(): string {
    return `<tr id="sort">${this.cells.map((cell) => cell.render()).join('\n')}</tr>`;
  }
}
