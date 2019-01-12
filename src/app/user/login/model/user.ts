import {Email} from '../../registration/model/email';
import {Password} from '../../registration/model/password';

export class User {

  email: Email;
  password: Password;

  constructor(jwtToken: string) {
    // console.log(jwtToken);
    this.email = new Email();
  }
}
