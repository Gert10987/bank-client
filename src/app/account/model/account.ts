import {Deserializable} from '../../user/registration/model/deserializable.model';
import {Money} from '../../user/registration/model/money';
import {Payment} from './payment';
import {Address} from './address';
import {Name} from '../../user/registration/model/name';
import {AccountNumber} from './account-number';

export class Account implements Deserializable {

  accountNumber: AccountNumber;

  registeredDateTime: string;

  name: Name;

  totalMoney: Money;

  payments: Array<Payment>;

  addresses: Array<Address>;

  constructor() {
  }

  deserialize(input: any): this {
    Object.assign(this, input);

    this.name = new Name().deserialize(input.name)

    this.totalMoney = new Money().deserialize(input.money);

    this.payments = input.payments.map(payment => new Payment().deserialize(payment)).toArray();

    this.addresses = input.addresses.map(addresses => new Address().deserialize(addresses)).toArray();

    return this;
  }
}
