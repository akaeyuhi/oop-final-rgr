import {ITable, Table} from './views/Table';
import {IReader, TableReader} from './views/TableReader';
import './style.css';
import em from './components/EventManager';

document.addEventListener('DOMContentLoaded', async () => {
  const tableReader: IReader = TableReader.getInstance();
  const table: ITable = Table.getInstance('#app');
  em.subscribe(tableReader, 'closeTable');
  em.subscribe(table, 'loadText');
});
