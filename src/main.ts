import Table from "./components/Table";
import TableReader from "./components/TableReader";
import './style.css';

document.addEventListener('DOMContentLoaded', async () => {
    const tableReader = TableReader.getInstance();
    tableReader.getRawText().then(text => {
        tableReader.switch();
        const table: Table = new Table(text as string);
        table.render('#app');
    })

});

