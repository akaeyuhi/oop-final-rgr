export interface ICell {
    data: any;
    render(): string;
}
export declare abstract class Cell implements ICell {
    data: any;
    protected constructor(data: any);
    abstract render(): string;
}
