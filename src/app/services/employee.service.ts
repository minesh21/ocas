import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../interfaces/employee';
import { Status } from '../interfaces/status';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  register(data: Employee) {
    return this.http.post<Status>('/user/register', data);
  }
}
