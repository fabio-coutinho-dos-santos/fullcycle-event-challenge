import EventHandlerInterface from "./event-handler.inteface";
import EventInteface from "./event.interface";

export default interface EventDispatcherInterface {
  notify(event: EventInteface): void;
  register(eventName: string, eventHandler: EventHandlerInterface): void;
  unregister(eventName: string, eventHandler: EventHandlerInterface): void;
  unregisterAll(): void;
}