import Cell from './Cell';

export default class DataCell extends Cell {
  constructor(data: string) {
    super(data);
  }

  render(): string {
    return `<td>${this.data}</td>`;
  }
}
