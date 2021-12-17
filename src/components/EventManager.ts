class EventManager {
    private listeners: Map<any, any> = new Map<any, any>();

    public subscribe(object: any, event: string) {
        this.listeners.set(object, event);
    }

    public notify(event: string, data: any) {
        this.listeners.forEach((value, key) => {
            if(value === event) {
                key.notify(event, data);
                console.log(key);
            }
        })
    }
}
const em =  new EventManager();
export default em;