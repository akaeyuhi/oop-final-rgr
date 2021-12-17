import FirstRow from "./FirstRow";
import Row from "./Row";
import DataRow from "./DataRow";

export default class Table {

    private mountSelector: string | undefined;
    private table: Element | null | undefined;
    private rawText: string;
    private rows: Array<Row> = [];

    constructor(textParse: string) {
        this.rawText = textParse;
        this.generateRows();
    }

    private parseData(): Array<Array<String>> {
        return this.rawText.split('\n')
            .map(row => {
                const regex = new RegExp(/\t+/);
                row.replace(regex, '\t');
                return row.split('\t').filter(cell => cell !== '' && cell !== '\t' && cell !== '\r');
            })
            .filter(row => row.length > 0);
    }

    private generateRows() {
        const table = this.parseData();
        const firstRow = new FirstRow(table[0] as Array<string>);
        this.rows?.push(firstRow);
        table.shift();
        table.forEach(row => {
           this.rows?.push(new DataRow(row as Array<string>));
        });
    }

    public render(mountSelector: string) {
        this.mountSelector = mountSelector;
        this.table = document.querySelector(`${this.mountSelector}`);
        this.rows?.forEach(row => {
            this.table?.insertAdjacentHTML('beforeend', row.render());
        });
        console.dir(this.rows);
        this.table?.classList.toggle('table');
    }
}