import { IReader } from '../views/TableReader';
import { ITable } from '../views/Table';

interface IEE {
  subscribe(object: ITable | IReader, event: string);
  unsubscribe(object: ITable | IReader);
  notify(event: string, data: any);
}

class EventManager {
  private listeners: Map<ITable | IReader, string> = new Map<ITable | IReader, string>();

  public subscribe(this: EventManager, object: ITable | IReader, event: string) {
    this.listeners.set(object, event);
  }

  public unsubscribe(this: EventManager, object: ITable | IReader) {
    this.listeners.delete(object);
  }

  public notify(this: EventManager, event: string, data: any) {
    this.listeners.forEach((value, key) => {
      if (value === event) {
        key.notify(event, data);
        console.log(key);
      }
    });
  }
}
const em: IEE = new EventManager();
export default em;
