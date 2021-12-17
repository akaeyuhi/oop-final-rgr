import em from '../components/EventManager';

export default class TableReader {
  private element: Element | null = document.querySelector('.reader');
  private root: Element | null = document.querySelector('.reader-container');
  private reader: FileReader = new FileReader();
  public isSubmitted: boolean = false;
  static instance: TableReader | null = null;

  private constructor() {
    this.render();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      return new TableReader();
    }
  }

  private async submitHandler(event: Event | undefined) {
    event?.preventDefault();
    const target = <HTMLFormElement>event?.target;
    const file: any = target.children[1] as unknown as FileList;
    this.reader.readAsText(file.files[0], 'utf-8');
    this.isSubmitted = true;
    const text = await this.getRawText();
    em.notify('loadText', text);
    this.switch();
  }

  private getRawText() {
    return new Promise((resolve) => {
      this.reader.onload = (e) => {
        resolve(e.target?.result);
      };
    });
  }

  private switch() {
    this.root?.classList.toggle('visible-flex');
  }

  public notify(event: string) {
    if (event === 'closeTable') this.switch();
  }

  public render() {
    this.element!.innerHTML = '';
    this.element?.insertAdjacentHTML(
      'beforeend',
      `<form class="fileInput">
                      <label for="file">Завантажте файл</label>
                      <input type="file" name="file" id="file" accept=".txt" required>
                      <input type="submit" value="Завантажити таблицю">
            </form>`
    );
    document.querySelector('.fileInput')?.addEventListener('submit', async () => await this.submitHandler(event));
  }
}
