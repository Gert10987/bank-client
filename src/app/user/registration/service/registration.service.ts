import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {RegistrationData} from '../model/registration-data';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private registrationResourceUrl = 'http://localhost:8080/users';

  constructor(private httpClient: HttpClient) {
  }

  register(registrationData: RegistrationData) {
    return this.httpClient.post(this.registrationResourceUrl + '/register', registrationData, {observe: 'response'})
      .pipe(
        map(response => null),
        catchError(this.handleError())
      );

  }

  handleError<T>() {
    return (error: HttpErrorResponse): Observable<T> => {
      return of( error.error );
    };
  }
}
