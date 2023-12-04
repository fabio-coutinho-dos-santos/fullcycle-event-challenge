import Customer from "../../customer/entity/customer";
import CustomerChangedAddressEvent from "../../customer/event/customer-changed-address.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import { SendConsoleLogHandler } from "../../customer/event/handler/send-console-log.handler";
import SendConsoleLog1Handler from "../../customer/event/handler/send-console-log1.handler";
import { SendConsoleLog2Handler } from "../../customer/event/handler/send-console.log2.handler";
import Address from "../../customer/value-object/address";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {

  describe("Products events", () => {

    it("should register an event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();

      eventDispatcher.register("ProductCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toBeDefined();
      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
        1
      );
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();

      eventDispatcher.register("ProductCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);

      eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toBeDefined();
      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
        0
      );
    });

    it("should unregister all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();

      eventDispatcher.register("ProductCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);

      eventDispatcher.unregisterAll();

      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toBeUndefined();
    });

    it("should notify all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();
      const spyEventHandler = jest.spyOn(eventHandler, "handle");

      eventDispatcher.register("ProductCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);

      const productCreatedEvent = new ProductCreatedEvent({
        name: "Product 1",
        description: "Product 1 description",
        price: 10.0,
      });

      // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
      eventDispatcher.notify(productCreatedEvent);
      expect(spyEventHandler).toHaveBeenCalled();
    });
  });

  describe('Costumer Events', () => {
    describe('CustomerCreated event', () => {

      it('should register a events handlers', () => {
        const sendConsoleLog1Handler = new SendConsoleLog1Handler();
        const sendConsoleLog2Handler = new SendConsoleLog2Handler();
        const eventDispatcher = new EventDispatcher();

        eventDispatcher.register("CustomerCreatedEvent", sendConsoleLog1Handler)
        eventDispatcher.register("CustomerCreatedEvent", sendConsoleLog2Handler)

        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length).toBe(2);
      })

      it('should unregister a events handlers', () => {
        const sendConsoleLog1Handler = new SendConsoleLog1Handler();
        const sendConsoleLog2Handler = new SendConsoleLog2Handler();
        const eventDispatcher = new EventDispatcher();

        eventDispatcher.register("CustomerCreatedEvent", sendConsoleLog1Handler)
        eventDispatcher.register("CustomerCreatedEvent", sendConsoleLog2Handler)

        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length).toBe(2);

        eventDispatcher.unregister("CustomerCreatedEvent", sendConsoleLog2Handler);
        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length).toBe(1);

        eventDispatcher.unregister("CustomerCreatedEvent", sendConsoleLog1Handler);
        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length).toBe(0);
      })

      it('should unregister all events handlers', () => {
        const sendConsoleLog1Handler = new SendConsoleLog1Handler();
        const sendConsoleLog2Handler = new SendConsoleLog2Handler();
        const eventDispatcher = new EventDispatcher();

        eventDispatcher.register("CustomerCreatedEvent", sendConsoleLog1Handler)
        eventDispatcher.register("CustomerCreatedEvent", sendConsoleLog2Handler)

        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length).toBe(2);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toBeUndefined();
      })

      it('should notify all events handlers', () => {
        const sendConsoleLog1Handler = new SendConsoleLog1Handler();
        const sendConsoleLog2Handler = new SendConsoleLog2Handler();

        const eventDispatcher = new EventDispatcher();
        const spySendConsoleLog1Handler = jest.spyOn(sendConsoleLog1Handler, 'handle');
        const spySendConsoleLog2Handler = jest.spyOn(sendConsoleLog2Handler, 'handle');

        eventDispatcher.register("CustomerCreatedEvent", sendConsoleLog1Handler)
        eventDispatcher.register("CustomerCreatedEvent", sendConsoleLog2Handler)

        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length).toBe(2);
        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]).toMatchObject(sendConsoleLog1Handler);
        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1]).toMatchObject(sendConsoleLog2Handler);


        const customerCreatedEvent = new CustomerCreatedEvent({
          name: 'Customer 1',
          rewardPoints: 10
        });

        eventDispatcher.notify(customerCreatedEvent);
        expect(spySendConsoleLog1Handler).toHaveBeenCalled();
        expect(spySendConsoleLog2Handler).toHaveBeenCalled();
      })
    })

    describe('CustomerChangedName event', () => {

      it('should register a handler', () => {
        const sendConsoleLogHandler = new SendConsoleLogHandler();
        const eventDispatcher = new EventDispatcher();

        eventDispatcher.register("CustomerChangedAddressEvent", sendConsoleLogHandler)

        expect(eventDispatcher.getEventHandlers['CustomerChangedAddressEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['CustomerChangedAddressEvent'].length).toBe(1);
        expect(eventDispatcher.getEventHandlers['CustomerChangedAddressEvent'][0]).toMatchObject(sendConsoleLogHandler);
      })

      it('should unregister a events handlers', () => {
        const sendConsoleLogHandler = new SendConsoleLogHandler();
        const eventDispatcher = new EventDispatcher();

        eventDispatcher.register("CustomerChangedAddressEvent", sendConsoleLogHandler)

        expect(eventDispatcher.getEventHandlers['CustomerChangedAddressEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['CustomerChangedAddressEvent'].length).toBe(1);
        expect(eventDispatcher.getEventHandlers['CustomerChangedAddressEvent'][0]).toMatchObject(sendConsoleLogHandler);

        eventDispatcher.unregister("CustomerChangedAddressEvent", sendConsoleLogHandler);
        expect(eventDispatcher.getEventHandlers['CustomerChangedAddressEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['CustomerChangedAddressEvent'].length).toBe(0);
      })

      it('should unregister all events handlers', () => {
        const sendConsoleLogHandler = new SendConsoleLogHandler();
        const eventDispatcher = new EventDispatcher();

        eventDispatcher.register("CustomerChangedAddressEvent", sendConsoleLogHandler)

        expect(eventDispatcher.getEventHandlers['CustomerChangedAddressEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['CustomerChangedAddressEvent'].length).toBe(1);
        expect(eventDispatcher.getEventHandlers['CustomerChangedAddressEvent'][0]).toMatchObject(sendConsoleLogHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers['CustomerChangedAddressEvent']).toBeUndefined();
      })

      it('should notify all events handlers', () => {
        const sendConsoleLogHandler = new SendConsoleLogHandler();
        const eventDispatcher = new EventDispatcher();
        const spyHandler = jest.spyOn(sendConsoleLogHandler, 'handle');

        eventDispatcher.register("CustomerChangedAddressEvent", sendConsoleLogHandler)

        expect(eventDispatcher.getEventHandlers['CustomerChangedAddressEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['CustomerChangedAddressEvent'].length).toBe(1);
        expect(eventDispatcher.getEventHandlers['CustomerChangedAddressEvent'][0]).toMatchObject(sendConsoleLogHandler);

        const customerCreatedEvent = new CustomerChangedAddressEvent({
          name: 'Customer 1',
          rewardPoints: 10
        });

        eventDispatcher.notify(customerCreatedEvent);
        expect(spyHandler).toHaveBeenCalled();
      })

      it('should notify all events handlers when the customer address is changed', () => {
        const sendConsoleLogHandler = new SendConsoleLogHandler();
        const spyHandler = jest.spyOn(sendConsoleLogHandler, 'handle');

        const firstAddress = new Address(
          'Street 1',
          1,
          '12345',
          'City 01'
        )

        const newAddress = new Address(
          'Street 2',
          2,
          '54321',
          'City 02'
        )

        const customer = new Customer(
          '1',
          'Customer 1',
        );

        customer.Address = firstAddress;
        customer.changeAddress(newAddress, sendConsoleLogHandler);

        expect(spyHandler).toHaveBeenCalled();
      })
    })
  })
});
