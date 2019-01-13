import {Injectable} from '@angular/core';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class IdentityManagerService {

  isLogged: boolean;
  user: User;
  jwtToken: string;

  constructor() {
    this.isLogged = false;
  }
}
