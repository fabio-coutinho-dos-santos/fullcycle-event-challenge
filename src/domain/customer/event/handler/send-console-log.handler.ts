import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerChangedAddressEvent from "../customer-changed-address.event";

export class SendConsoleLogHandler implements EventHandlerInterface<CustomerChangedAddressEvent> {
  handle(event: CustomerChangedAddressEvent): void {
    console.log(`Address of client ${event.eventData.customerName} - ${event.eventData.cutomerId} was changed to ${event.eventData.address}`)
  }

}