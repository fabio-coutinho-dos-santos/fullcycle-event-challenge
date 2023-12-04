import EventDispatcher from "../../@shared/event/event-dispatcher";
import EventHandlerInterface from "../../@shared/event/event-handler.interface";
import CustomerChangedAddressEvent from "../event/customer-changed-address.event";
import { SendConsoleLogHandler } from "../event/handler/send-console-log.handler";
import Address from "../value-object/address";

export default class Customer {
  private _id: string;
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  get Address(): Address {
    return this._address;
  }

  changeAddress(address: Address, eventHandler?: EventHandlerInterface<CustomerChangedAddressEvent>) {
    this._address = address;
    if (eventHandler) {
      const eventDispatcher = new EventDispatcher();
      const changedAddressEvent = new CustomerChangedAddressEvent({
        address: this._address,
        customerName: this._name,
        cutomerId: this.id
      });
      eventDispatcher.register('CustomerChangedAddressEvent', eventHandler)
      eventDispatcher.notify(changedAddressEvent);
    }
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set Address(address: Address) {
    this._address = address;
  }
}
