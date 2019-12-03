import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
 intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     return next.handle(req).pipe(
         catchError(error => {
             if (error instanceof HttpErrorResponse) {

                 if ( error.status === 401) {
                     return throwError(error.statusText);

                 }

                // ** an intercepter that will call the global error from the webapi  */
                 const applicationError = error.headers.get('Application-Error'); // * check for Application error */
                 if (applicationError) {
                     console.error(applicationError);
                     return throwError(applicationError);

                 }
                 const severError = error.error; // * check for sever error * /
                 let modalStateErrors = '';
                 if(severError && typeof severError === 'object') {
                     for (const key in severError){
                         if (severError[key]) {
                             modalStateErrors += severError[key] + '\n';
                         }

                     }

                 }
                 return throwError(modalStateErrors || severError || 'Server Error'); // * pass generic sver error * / 

             }
         }
         )
     );
 }
}

export const ErrorInterceptorProvider = {  // Export the global exception tpo the model,call this method to the model provider
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
