export default abstract class Cell {
    data: any;

    constructor(data: any) {
        this.data = data;
    }

    abstract render(): string
}
