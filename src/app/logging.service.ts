import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs/internal/observable/throwError';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {UserService} from './user.service';
import {__assign} from 'tslib/tslib';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  loggingUrl = 'https://cfjhnas8pd.execute-api.eu-central-1.amazonaws.com/prod';

  httpOptions = {
    headers: new HttpHeaders({
      // 'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient,
              private userService: UserService) {
  }

  SendData(data): Observable<{}> {
    const testID = this.userService.testID === null ? 1 : this.userService.testID;
    const variant = this.userService.variant === null ? 0 : this.userService.variant;
    const testData = {'testID': testID,
                      'variant': variant,
                      'lastUpdate': Date()};
    data = Object.assign(testData, data);
    console.log('sending: \n' + JSON.stringify(data, null, ' '));
    return this.http.post(this.loggingUrl, data, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  SendAvailableData(): Observable<{}> {
    console.log('sending: \n' + JSON.stringify(this.userService, null, ' '));
    this.userService.lastUpdate = Date();
    return this.http.post(this.loggingUrl, this.userService, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
