import EventInteface from "../@shared/event.interface";

export default class ProductCreatedEvent implements EventInteface {
  dataTimeOccourred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dataTimeOccourred = new Date();
    this.eventData = eventData;
  }

}