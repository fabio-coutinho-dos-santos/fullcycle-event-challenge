import EventInterface from "../../@shared/event/event.interface";

export default class CustomerChangedAddressEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.eventData = eventData
  }
}