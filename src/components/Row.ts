import { ICell } from './Cell';
import NullCell from './NullCell';

export interface IRow {
  cells: ICell[];
  parseCells(): any;
  render(): string;
  pushNullCell(): void;
  textCells: string[];
}

export abstract class Row implements IRow {
  abstract cells: ICell[];
  protected rawCells: string[];

  protected constructor(row: string[]) {
    this.rawCells = row;
  }

  abstract parseCells(): any;
  abstract render(): string;
  public pushNullCell(): void {
    this.cells.push(new NullCell());
  }

  get textCells() {
    return this.rawCells;
  }
}
