import Cell from "./Cell";

export default class SortCell extends Cell {
    render(): string {
        return `<th>${this.data}</th>`;
    }
}