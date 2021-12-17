import Cell from './Cell';
import NullCell from './NullCell';

export default abstract class Row {
  abstract cells: Array<Cell>;
  protected rawCells: Array<string>;

  protected constructor(row: Array<string>) {
    this.rawCells = row;
  }

  abstract parseCells(): any;
  abstract render(): string;
  public pushNullCell(): void {
    this.cells.push(new NullCell(''));
  }

  get textCells() {
    return this.rawCells;
  }
}
