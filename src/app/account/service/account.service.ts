import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Money} from '../../user/registration/model/money';
import {Account} from '../model/account';
import {IdentityManagerService} from '../../user/login/service/identity-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountResourceUrl = 'http://localhost:8080/account';

  constructor(private httpClient: HttpClient, private identityService: IdentityManagerService) {
  }

  public details(accountId: string): Observable<Account> {
    return this.httpClient.get<Account>(this.accountResourceUrl + '/' + accountId, {headers: {'Authorization': 'Bearer ' + this.identityService.user.token}}).pipe(
      map(account => {
        return account;
      }));
  }

  public charge(accountId: string, money: Money) {
    return this.httpClient.put(this.accountResourceUrl + '/' + accountId + '/charge', money, {
      observe: 'response',
      headers: {'Authorization': 'Bearer ' + this.identityService.user.token}
    })
      .pipe(
        map(response => null),
        catchError(this.handleError())
      );
  }

  public transfer(accountId: string, otherAccountNumber: string, money: Money) {
    return this.httpClient.put(this.accountResourceUrl + '/' + accountId + '/transfer/' + otherAccountNumber + '/charge',
      money, {observe: 'response', headers: {'Authorization': 'Bearer ' + this.identityService.user.token}})
      .pipe(
        map(response => null),
        catchError(this.handleError())
      );
  }

  handleError<T>() {
    return (error: HttpErrorResponse): Observable<T> => {
      return of(error.error);
    };
  }
}
