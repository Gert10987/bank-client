import {Deserializable} from '../../user/registration/model/deserializable.model';
import {Money} from '../../user/registration/model/money';

export class Payment implements Deserializable {

  money: Money;

  registeredDateTime: string;

  type: string;

  constructor() {
  }

  deserialize(input: any): this {
    Object.assign(this, input);

    this.money = new Money().deserialize(input.money);

    return this;
  }
}
