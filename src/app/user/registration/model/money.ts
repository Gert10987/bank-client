import {Deserializable} from './deserializable.model';

export class Money implements Deserializable {

  amount: number;
  currency: string;

  deserialize(input: any): this {
    Object.assign(this, input);

    return this;
  }
}
