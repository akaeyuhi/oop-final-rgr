import TableReader from '../views/TableReader';
import Table from '../views/Table';

class EventManager {
  private listeners: Map<Table | TableReader, string> = new Map<any, any>();

  public subscribe(object: any, event: string) {
    this.listeners.set(object, event);
  }

  public notify(event: string, data: any) {
    this.listeners.forEach((value, key) => {
      if (value === event) {
        key.notify(event, data);
        console.log(key);
      }
    });
  }
}
const em = new EventManager();
export default em;
