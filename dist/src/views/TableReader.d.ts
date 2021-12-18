export interface IReader {
    notify(event: string): any;
}
export declare class TableReader implements IReader {
    private element;
    private root;
    private reader;
    static instance: IReader | null;
    private constructor();
    static getInstance(): IReader;
    private submitHandler;
    private getRawText;
    private switch;
    notify(event: string): void;
    private render;
}
