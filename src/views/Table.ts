import FirstRow from '../components/FirstRow';
import Row from '../components/Row';
import DataRow from '../components/DataRow';
import em from '../components/EventManager';

export default class Table {
  static instance: Table | null = null;
  private readonly mountSelector: string | undefined;
  private table: Element | null | undefined;
  private root: Element | null = document.querySelector('.table-container');
  private rawText: string = '';
  private rows: Array<Row> = [];

  private constructor(tableSelector: string) {
    this.mountSelector = tableSelector;
    document.querySelector('.to-load')?.addEventListener('click', () => {
      this.switch();
      this.clearTable();
      em.notify('closeTable', null);
    });
  }

  static getInstance(tableSelector: string) {
    if (!this.instance) {
      return new Table(tableSelector);
    } else return this.instance;
  }

  private parseData(): Array<Array<String>> {
    return this.rawText
      .split('\n')
      .map((row) => {
        const regex = new RegExp(/\t+/);
        row.replace(regex, '\t');
        return row.split('\t').filter((cell) => cell !== '' && cell !== '\t' && cell !== '\r');
      })
      .filter((row) => row.length > 0);
  }

  private setURL() {
    const textTofile = this.rows.map((row) => row.textCells.join('\t')).join('\n');
    const blob = new Blob([textTofile], { type: 'text/plain' });
    document.querySelector('.save')?.setAttribute('href', URL.createObjectURL(blob));
    document.querySelector('.save')?.setAttribute('download', 'table.txt');
  }

  private generateRows() {
    const table = this.parseData();
    const firstRow = new FirstRow(table[0] as Array<string>);
    this.rows?.push(firstRow);
    table.shift();
    table.forEach((row) => {
      this.rows?.push(new DataRow(row as Array<string>));
    });
    this.normalizeRows();
  }

  private normalizeRows() {
    this.rows?.forEach((row) => {
      while (row.cells.length < this.rows[0].cells.length) {
        row.pushNullCell();
      }
    });
  }

  private switch() {
    this.root?.classList.toggle('visible');
  }

  private clearTable() {
    this.table!.innerHTML = '';
    this.rawText = '';
    this.rows = [];
  }

  public notify(event: string, data: string): void {
    if (event === 'loadText') {
      this.rawText = data;
      this.generateRows();
      this.setURL();
      this.render();
      this.switch();
    }
  }

  private render() {
    this.table = document.querySelector(`${this.mountSelector}`);
    this.rows?.forEach((row) => {
      this.table?.insertAdjacentHTML('beforeend', row.render());
    });
  }
}
