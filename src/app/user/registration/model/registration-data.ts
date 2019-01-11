import {Deserializable} from './deserializable.model';

export class RegistrationData implements Deserializable {

  id: number;

  firstName: string;
  lastName: string;

  deserialize(input: any): this {
    Object.assign(this, input);

    return this;
  }
}
