import {Deserializable} from './deserializable.model';

export class Name implements Deserializable {

  firstName: string;
  lastName: string;

  deserialize(input: any): this {
    Object.assign(this, input);

    return this;
  }
}
