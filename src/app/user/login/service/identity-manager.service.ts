import {Injectable} from '@angular/core';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class IdentityManagerService {

  isLogged: boolean;
  user: User;

  constructor() {
    this.isLogged = false;
  }
}
