import {Deserializable} from '../../user/registration/model/deserializable.model';

export class AccountNumber implements Deserializable {

  prefix: string;
  number: string;

  constructor() {
  }

  deserialize(input: any): this {
    Object.assign(this, input);

    return this;
  }
}
