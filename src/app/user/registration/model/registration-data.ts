import {Deserializable} from './deserializable.model';
import {Name} from './name';
import {Money} from './money';
import {Password} from './password';
import {Email} from './email';

export class RegistrationData implements Deserializable {

  name: Name;

  email: Email;
  password: Password;

  money: Money;

  constructor() {
    this.name = new Name();
    this.email = new Email();
    this.password = new Password();
    this.money = new Money();
  }

  deserialize(input: any): this {
    Object.assign(this, input);

    this.name = new Name().deserialize(input.name);

    this.email = new Email().deserialize(input.email);
    this.password = new Password().deserialize(input.password);

    this.money = new Money().deserialize(input.money);

    return this;
  }
}
