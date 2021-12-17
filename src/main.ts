import Table from "./components/Table";
import TableReader from "./components/TableReader"

document.addEventListener('DOMContentLoaded', async () => {
    const tableReader = new TableReader();
    const table: Table = new Table();
    table.render('#app');
});

