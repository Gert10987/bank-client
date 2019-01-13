import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {LoginData} from '../model/login-data';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private registrationResourceUrl = 'http://localhost:8080/users';

  constructor(private httpClient: HttpClient) {

  }

  login(loginData: LoginData) {
    return this.httpClient.post(this.registrationResourceUrl + '/login', loginData, {
      observe: 'response',
      responseType: 'text'
    }).pipe(
      map(response => response.ok ? new User(response.body) : null)
    );
  }

  logout(tokenId: string) {

    return this.httpClient.delete(this.registrationResourceUrl + '/logout', {observe: 'response', params: {'uuid': tokenId}})
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
