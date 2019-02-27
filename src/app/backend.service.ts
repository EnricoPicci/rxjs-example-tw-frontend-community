import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  url = 'https://08eb79v3fc.execute-api.us-east-1.amazonaws.com/dev/executeService';

  constructor(
    private http: HttpClient,
  ) { }

  getVotingEvents(): Observable<Array<any>> {
    const payload = this.buildPostPayloadForService('getVotingEvents');
    return this.http
    .post(this.url, payload)
    .pipe(
      map((resp: any) => {
        return resp.data;
      }),
      catchError(this.handleError),
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
        `body was: ${JSON.stringify(error)}`);
    }
    // tslint:disable-next-line:no-console
    console.trace();
    // return an ErrorObservable with a user-facing error message
    return throwError(
      new Error('Something bad happened; please try again later. You may take a look at the browser console to get a hint.')
    );
  }

  private buildPostPayloadForService(service: string) {
    return {service};
  }

}
