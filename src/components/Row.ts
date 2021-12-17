import Cell from "./Cell";

export default abstract class Row {
    abstract cells: Array<Cell>;
    protected rawCells: Array<string>

    protected constructor(row: Array<string>) {
        this.rawCells = row;
    }

    abstract parseCells(): any
    abstract render(): string

}