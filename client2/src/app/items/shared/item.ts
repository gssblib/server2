import { Checkout } from "./checkout";
import { ItemState } from "./item-state";
/**
 * Represents an item (as stored in the database).
 */
export class Item {
  id: number;
  barcode: string;
  antolin: string;
  author: string;
  title: string;
  category: string;
  subject: string;
  publicationyear: number;
  publisher: string;
  age: string;
  serial: string;
  seriestitle: string;
  classification: string;
  isbn10: string;
  isbn13: string;
  state: ItemState;
  checkout?: Checkout;
  history: Array<any>;

  get status(): ItemState {
    return this.state === ItemState.CIRCULATING
        ? this.checkout ? ItemState.CHECKED_OUT : ItemState.AVAILABLE
        : this.state;
  }

  get statusString(): string {
    return ItemState[this.status];
  }
}
