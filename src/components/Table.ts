export default class Table {

    private mountSelector: String | undefined;
    private table: Element | null | undefined;

    constructor() {
    }

    public render(mountSelector: String) {
        this.mountSelector = mountSelector;
        this.table = document.querySelector(`${this.mountSelector}`);
    }
}