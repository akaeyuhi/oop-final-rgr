import { IReader } from '../views/TableReader';
import { ITable } from '../views/Table';
interface IEE {
    subscribe(object: ITable | IReader, event: string): any;
    unsubscribe(object: ITable | IReader): any;
    notify(event: string, data: any): any;
}
declare const em: IEE;
export default em;
