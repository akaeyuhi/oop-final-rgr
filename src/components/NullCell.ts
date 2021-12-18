import { Cell, ICell } from './Cell';

export default class NullCell extends Cell implements ICell {
  constructor() {
    super('');
  }
  render(): string {
    return `<td></td>`;
  }
}
