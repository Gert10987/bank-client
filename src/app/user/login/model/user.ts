import {Email} from '../../registration/model/email';
import {Base64} from 'js-base64';


export class User {

  email: Email;
  accountId: string;

  tokenId: string;
  token: string;

  constructor(jwtToken: string) {
    this.token = jwtToken;

    const decodedToken = this.decodeToken(jwtToken);

    this.email = new Email();
    this.email.value = decodedToken['sub'].toString();

    this.accountId = decodedToken['account_id'];
    this.tokenId = decodedToken['id'];
  }

  private decodeToken(token: string): string {
    const parts = token.split('.');
    if (parts.length !== 3) {

      throw new Error('JWT must have 3 parts');
    }
    const decoded = Base64.decode(parts[1]);

    if (!decoded) {
      throw new Error('Cannot decode the token');
    }
    return JSON.parse(decoded);
  }
}
