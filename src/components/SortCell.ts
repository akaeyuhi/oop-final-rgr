import {Cell, ICell} from './Cell';

export default class SortCell extends Cell implements ICell{
  constructor(data: any) {
    super(data);
  }

  render(this: SortCell): string {
    return `<th>${this.data}</th>`;
  }
}
