import FirstRow from '../components/FirstRow';
import {Row} from '../components/Row';
import DataRow from '../components/DataRow';
import em from '../components/EventManager';

export interface ITable {
  notify(event: string, data: string)
}

export class Table implements ITable{
  static instance: Table | null = null;
  private readonly mountSelector: string | undefined;
  private table: Element | null | undefined;
  private root: Element | null = document.querySelector('.table-container');
  private rawText: string = '';
  private rows: Row[] = [];

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

  public notify(event: string, data: string, ): void {
    this.rawText = data;
    this.generateRows();
    this.setURL();
    this.render();
    this.setClick();
    this.switch();
  }

  private render(this: Table) {
    this.table = document.querySelector(`${this.mountSelector}`);
    this.rows?.forEach((row) => {
      this.table?.insertAdjacentHTML('beforeend', row.render());
    });
  }

  private parseData(this: Table): string[][] {
    return this.rawText
      .split('\n')
      .map((row) => {
        const regex = new RegExp(/\t+/);
        row.replace(regex, '\t');
        return row.split('\t').filter((cell) => cell !== '' && cell !== '\t' && cell !== '\r');
      })
      .filter((row) => row.length > 0);
  }

  private setURL(this: Table) {
    const textFile = this.rows.map((row) => row.textCells.join('\t')).join('\n');
    const blob = new Blob([textFile], { type: 'text/plain' });
    document.querySelector('.save')?.setAttribute('href', URL.createObjectURL(blob));
  }

  private generateRows(this: Table) {
    const table = this.parseData();
    const firstRow = new FirstRow(table[0] as Array<string>);
    this.rows?.push(firstRow);
    table.shift();
    table.forEach((row) => {
      this.rows?.push(new DataRow(row as Array<string>));
    });
    this.normalizeRows();
  }

  private normalizeRows(this: Table) {
    this.rows?.forEach((row) => {
      while (row.cells.length < this.rows[0].cells.length) {
        row.pushNullCell();
      }
    });
  }

  private switch(this: Table) {
    this.root?.classList.toggle('visible');
  }

  private setClick(this: Table) {
    document.querySelector('#sort')?.addEventListener('click', (event) => {
      if ((<HTMLElement>event.target).tagName === 'TH') {
        this.sortTable(Array.prototype.indexOf.call((<HTMLElement>event.target).parentNode?.children, event.target));
      }
    });
  }

  private clearTable(this: Table) {
    this.table!.innerHTML = '';
    this.rawText = '';
    this.rows = [];
  }

  private sortTable(this: Table, index: number) {
    let rows: HTMLCollectionOf<Element>,
      switching: boolean,
      i: number,
      x: Element,
      y: Element,
      shouldSwitch: boolean = false,
      dir: string,
      switchCount = 0;
    switching = true;
    dir = 'asc';
    const sort = (index: number, dir: string): boolean | undefined => {
      let innerX: string | number = x.innerHTML.toLowerCase();
      let innerY: string | number = y.innerHTML.toLowerCase();
      if (index === 0) {
        innerX = +innerX;
        innerY = +innerY;
      }
      if (dir === 'asc') {
        if (innerX > innerY) {
          return true;
        }
      } else if (dir === 'desc') {
        if (innerX < innerY) {
          return true;
        }
      }
    };
    while (switching) {
      switching = false;
      rows = (<HTMLTableElement>this.table)?.rows;
      for (i = 1; i < rows.length - 1; i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName('TD')[index];
        y = rows[i + 1].getElementsByTagName('TD')[index];
        const result = sort(index, dir);
        if (result) {
          shouldSwitch = result;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode?.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchCount++;
      } else {
        if (switchCount == 0 && dir == 'asc') {
          dir = 'desc';
          switching = true;
        }
      }
    }
  }
}
