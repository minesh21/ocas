import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Employee } from '../interfaces/employee';
import { Status } from '../interfaces/status';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  /**
   * Register
   *
   * @param: data
   * @return Observable<Status>
   * @description: Returns Observable to client with status of response
   */
  register(data: Employee) {
    return this.http.post<Status>('/user/register', data);
  }

  /**
   * list
   *
   * @param: none
   * @return Observable<Status>
   * @description: Returns response from server to client
   */
  async list(start?, end?): Promise<Employee[]> {
    return await this.http.get<Status>('/user/list', {
      params: new HttpParams().set('start', start).set('end', end)
    }).pipe(map(res => res.data)).toPromise();
  }


}
