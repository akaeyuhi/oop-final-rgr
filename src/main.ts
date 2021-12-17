import Table from "./components/Table";
import TableReader from "./components/TableReader";
import './style.css';

document.addEventListener('DOMContentLoaded', async () => {
    const tableReader = new TableReader();
    tableReader.show();
    const text = await tableReader.getRawText();
    console.log(text);
    const table: Table = new Table();
    table.render('#app');
});

