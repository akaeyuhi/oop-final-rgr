import Table from "./views/Table";
import TableReader from "./views/TableReader";
import './style.css';
import em from "./components/EventManager";

document.addEventListener('DOMContentLoaded', async () => {
    const tableReader = TableReader.getInstance();
    const table = new Table('#app');
    em.subscribe(tableReader, 'closeTable');
    em.subscribe(table, 'loadText');
});

