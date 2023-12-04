import EventHandlerInterface from "./event-handler.inteface";
import EventDispatcherInterface from "./event.dispatcher.interface";
import EventInteface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {

  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {}

  notify(event: EventInteface): void {
    const eventName = event.constructor.name
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((eventHandlers) => {
        eventHandlers.handle(event);
      })
    }
  }

  register(eventName: string, eventHandler: EventHandlerInterface<EventInteface>): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(eventHandler)
  }

  unregister(eventName: string, eventHandler: EventHandlerInterface<EventInteface>): void {
    if (this.eventHandlers[eventName]) {
      const index = this.eventHandlers[eventName].indexOf(eventHandler)
      if (index !== -1) {
        this.eventHandlers[eventName].splice(index, 1)
      }
    }
  }

  unregisterAll(): void {
    this.eventHandlers = {};
  }

  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers;
  }

}