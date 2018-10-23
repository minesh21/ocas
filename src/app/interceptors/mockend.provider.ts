import { Injectable } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Employee } from '../interfaces/employee';
import {  delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class MockendInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const employees: Employee[] = JSON.parse(localStorage.getItem('employees')) || [];

    return of(null).pipe(mergeMap(() => {

        // register
        if (req.url.endsWith('/user/register') && req.method === 'POST') {
            const data = req.body;

            if (!this.isRequiredFilled(data)) {
              return of(new HttpResponse({status: 400, body: {status: 'bad', message: 'Please fill all required fields'} }));
            }

            if (!this.isValidEmail(data.email)) {
              return of(new HttpResponse({status: 400, body: {status: 'bad', message: 'Not a valid email'} }));
            }

            if (!this.isUniqueUser(employees, data.email)) {
              return of(new HttpResponse({status: 400, body: {status: 'bad', message: 'User with this email already exists'} }));
            }

            employees.push(data);
            localStorage.setItem('employees', JSON.stringify(employees));
            return of(new HttpResponse({status: 200, body: {status: 'ok', message: 'Successfully registered!'} }));
        }

        // list
        if (req.url.endsWith('/user/list') && req.method === 'GET') {
          // code here
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

export let MockendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: MockendInterceptor,
  multi: true
};
