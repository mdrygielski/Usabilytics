import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs/internal/observable/throwError';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  loggingUrl = 'https://cfjhnas8pd.execute-api.eu-central-1.amazonaws.com/prod';

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  };

  private testData: { testID: number; comment: string; timestamp: string };

  constructor(private http: HttpClient) {
  }


  SendTestData(): Observable<{}> {
    const testID = Date.now();
    const currentTimestamp = Date();
    this.testData = {
      testID: testID,
      comment: 'start',
      timestamp: currentTimestamp};
    return this.http.post(this.loggingUrl, this.testData, this.httpOptions).pipe(
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
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}