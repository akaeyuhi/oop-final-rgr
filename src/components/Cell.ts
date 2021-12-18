export interface ICell {
  data: any;
  render(): string;
}

export abstract class Cell implements ICell {
  data: any;

  protected constructor(data: any) {
    this.data = data;
  }

  abstract render(): string;
}
