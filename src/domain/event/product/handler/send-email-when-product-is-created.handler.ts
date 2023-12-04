import EventHandlerInterface from "../../@shared/event-handler.inteface";
import EventInteface from "../../@shared/event.interface";

export default class SendEmailWhenProductIsCreateHandler implements EventHandlerInterface {
  handle(event: EventInteface): void {
    console.log(`Sending email to ......`)
  }

}