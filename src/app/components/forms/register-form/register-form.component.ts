import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../interfaces/employee';
import { EmployeeService } from '../../../services/employee.service';
import { Status } from '../../../interfaces/status';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterForm implements OnInit {
  employee: Employee = {first_name: '', last_name: '', comments: '', activity: '', email: ''};
  status: Status;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {}

  register() {
    this.employeeService.register(this.employee)
      .subscribe(res => {
        this.status = res;

        if (this.status.status === 'ok') {
          setTimeout(() => {
            this.status = null;
            this.clearEmployee();
          }, 1000);
        }

      });
  }

  clearEmployee() {
    this.employee.first_name = '';
    this.employee.last_name = '';
    this.employee.email = '';
    this.employee.activity = '';
    this.employee.comments = '';
  }
}
