import {Email} from '../../registration/model/email';
import {Password} from '../../registration/model/password';

export class User {

  email: Email;
  accountId: string;

  tokenId: string;

  constructor(jwtToken: string) {
    console.log(jwtToken);

    this.email = new Email(jwtToken['sub'].toString());

    this.accountId = jwtToken['account_id'];
    this.tokenId = jwtToken['id'];
  }
}
