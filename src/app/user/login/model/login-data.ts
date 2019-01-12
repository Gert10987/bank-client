import {Email} from '../../registration/model/email';
import {Password} from '../../registration/model/password';

export class LoginData {

  email: Email;
  password: Password;

  constructor() {
    this.email = new Email();
    this.password = new Password();
  }
}
