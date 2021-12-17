import Cell from './Cell';

export default class NullCell extends Cell {
  render(): string {
    return `<td></td>`;
  }
}
