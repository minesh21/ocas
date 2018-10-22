import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../interface/user';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class MockendProvider implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let users: User[] = JSON.parse(localStorage.getItem('users')) || [];

    return of(null).pipe(mergeMap(() => {

        // register
        if (req.url.endsWith('/user/register') && req.method === 'POST') {
            const data = req.body.data;

            if (!this.isRequiredFilled(data)) {
              return new HttpResponse({status: 400, statusText: 'Please fill all required fields'});
            }

            if (!this.isValidEmail(data.email)) {
              return new HttpResponse({status: 400, statusText: 'Not a valid email'});
            }

            if (!this.isValidPassword(data.password)) {
              return new HttpResponse({status: 400, statusText: 'Password must be between 6-16 characters long'});
            }

            if (!this.isUniqueUser(users, data.email)) {
              return new HttpResponse({status: 400, statusText: 'User with this name already exists'});
            }

            users.push(data);
            localStorage.setItem('users', JSON.stringify(users));
            return new HttpResponse({status: 200, statusText: 'Successfully registered!'});
        }

        // authenticate
        if (req.url.endsWith('/user/authenticate') && req.method === 'GET') {
          // code here
        }

        // list
        if (req.url.endsWith('/user/list') && req.method === 'GET') {
          // code here
        }

        // overlook any other requests not handled
        return next.handle(req);
      })
    );
  }

  private isUniqueUser(users: User[], email: string): boolean {
    return users.findIndex(user => user.email === email) !== -1;
  }

  private isValidEmail(email): boolean {
    return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
  }

  private isValidPassword(password): boolean {
    return password.length > 5 && password.length < 17;
  }

  private isRequiredFilled(data: User): boolean {
    return data.first_name.length > 0 && data.last_name.length > 0 && data.email.length > 0 && data.activity.length > 0;
  }

}
