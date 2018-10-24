import { Injectable } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Employee } from '../interfaces/employee';
import {  delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

/**
 * MockendInterceptor
 * -------------------------------------------------------------
 *
 * credit: http://jasonwatmore.com/post/2018/06/22/angular-6-mock-backend-example-for-backendless-development
 * @author: Minesh Varu
 * @description:
 *    This interceptor will intercept incoming HTTP requests and ignore all other requests. This is used simply
 *    to simulate a backend, to test service calls from  employee service. This mock backend simulates a simple
 *    employee activity registration and stores the data in local storage, this is also where services to load
 *    employee information is handled as well. The idea is to either write or read from local storage in order
 *    for the data to persist among all components, and using shared modules as well. All validations are done
 *    in this simulated backend as well as response are sent back to the service that is calling the api on this
 *    "backend".
 */
@Injectable()
export class MockendInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const employees: Employee[] = JSON.parse(localStorage.getItem('employees')) || [];

    return of(null).pipe(mergeMap(() => {

        // register
        if (req.url.endsWith('/user/register') && req.method === 'POST') {
            const data = req.body;

            // Validation to check if all required fields are populated
            if (!this.isRequiredFilled(data)) {
              return of(new HttpResponse({status: 400, body: {status: 'bad', message: 'Please fill all required fields'} }));
            }

            // Validation to check if email is valid
            if (!this.isValidEmail(data.email)) {
              return of(new HttpResponse({status: 400, body: {status: 'bad', message: 'Not a valid email'} }));
            }

            // Validation check to see if user is unique, no duplicates!
            if (!this.isUniqueUser(employees, data.email)) {
              return of(new HttpResponse({status: 400, body: {status: 'bad', message: 'Employee with this email already exists'} }));
            }

            employees.push(data);
            localStorage.setItem('employees', JSON.stringify(employees));
            return of(new HttpResponse({status: 200, body: {status: 'ok', message: 'Successfully registered!'} }));
        }

        // list
        if (req.url.endsWith('/user/list') && req.method === 'GET') {

          if (employees.length === 0) {
            return of(new HttpResponse({status: 400, body: {status: 'bad', message: 'No Activities Found!'} }));
          }

          return of(new HttpResponse({status: 200, body: {status: 'ok', data: employees} }));
        }

        // overlook any other requests not handled
        return next.handle(req);
      }))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }

  private isUniqueUser(employees: Employee[], email: string): boolean {
    return employees.findIndex(employee => employee.email === email) === -1;
  }

  private isValidEmail(email): boolean {
    return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
  }

  private isRequiredFilled(data: Employee): boolean {
    return data.first_name.length > 0 && data.last_name.length > 0 && data.email.length > 0 && data.activity.length > 0;
  }

}

// Export this interceptor class as a provider to use in appropriate module
export let MockendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: MockendInterceptor,
  multi: true
};
