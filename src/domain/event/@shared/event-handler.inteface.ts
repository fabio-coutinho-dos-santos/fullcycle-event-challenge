import EventInteface from "./event.interface";

export default interface EventHandlerInterface<T extends EventInteface = EventInteface> {
  handle(event: T): void;
}