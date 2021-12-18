import em from '../components/EventManager';

export interface IReader {
  notify(event: string);
}

export class TableReader implements IReader {
  private element: Element | null = document.querySelector('.reader');
  private root: Element | null = document.querySelector('.reader-container');
  private reader: FileReader = new FileReader();
  static instance: IReader | null = null;

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

  private async submitHandler(this: TableReader, event: Event | undefined) {
    event?.preventDefault();
    const target = <HTMLFormElement>event?.target;
    const file: any = target.children[1] as unknown as FileList;
    this.reader.readAsText(file.files[0], 'utf-8');
    const text = await this.getRawText();
    em.notify('loadText', text);
    this.switch();
  }

  private getRawText(this: TableReader) {
    return new Promise((resolve) => {
      this.reader.onload = (e) => {
        resolve(e.target?.result);
      };
    });
  }

  private switch(this: TableReader) {
    this.root?.classList.toggle('visible-flex');
  }

  public notify(event: string) {
    if (event === 'closeTable') this.switch();
  }

  private render(this: TableReader) {
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
