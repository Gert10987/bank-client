import {Deserializable} from './deserializable.model';

export class Email implements Deserializable {

  value: string;

  deserialize(input: any): this {
    Object.assign(this, input);

    return this;
  }
}
