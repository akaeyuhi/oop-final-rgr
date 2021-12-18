import { Cell, ICell } from './Cell';
export default class DataCell extends Cell implements ICell {
    constructor(data: string);
    render(this: DataCell): string;
}
