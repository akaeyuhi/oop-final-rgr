export interface ITable {
    notify(event: string, data: string): any;
}
export declare class Table implements ITable {
    static instance: Table | null;
    private readonly mountSelector;
    private table;
    private root;
    private rawText;
    private rows;
    private constructor();
    static getInstance(tableSelector: string): Table;
    notify(event: string, data: string): void;
    private render;
    private parseData;
    private setURL;
    private generateRows;
    private normalizeRows;
    private switch;
    private setClick;
    private clearTable;
    private sortTable;
}
