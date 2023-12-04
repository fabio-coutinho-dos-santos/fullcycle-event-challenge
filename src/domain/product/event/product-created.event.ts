import EventInterface from "../../event/@shared/event.interface";

export default class ProductCreatedEvent implements EventInterface {
  dataTimeOccourred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dataTimeOccourred = new Date();
    this.eventData = eventData;
  }
}
