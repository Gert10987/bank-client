import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {LoginData} from '../model/login-data';
import {User} from '../model/user';
import {Base64} from 'js-base64';

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
      map(response => response.ok ? new User(this.decodeToken(response.body)) : null)
    );
  }

  logout(tokenId: string) {
    const params = new HttpParams();
    params.append('uuid', tokenId);

    return this.httpClient.delete(this.registrationResourceUrl + '/logout', {observe: 'response', params: params})
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
