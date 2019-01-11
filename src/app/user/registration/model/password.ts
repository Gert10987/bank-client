import {Deserializable} from './deserializable.model';

export class Password implements Deserializable {

  value: string;

  deserialize(input: any): this {
    Object.assign(this, input);

    return this;
  }
}
