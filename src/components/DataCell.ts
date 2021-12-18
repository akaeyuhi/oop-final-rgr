import { Cell, ICell } from './Cell';

export default class DataCell extends Cell implements ICell {
  constructor(data: string) {
    super(data);
  }

  render(this: DataCell): string {
    return `<td>${this.data}</td>`;
  }
}
