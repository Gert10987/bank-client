import {Deserializable} from '../../user/registration/model/deserializable.model';

export class Address implements Deserializable {

  city: string;
  street: string;

  constructor() {
  }

  deserialize(input: any): this {
    Object.assign(this, input);

    return this;
  }
}
