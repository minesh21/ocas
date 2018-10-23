import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RegisterForm } from './forms/register-form/register-form.component';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [HeaderComponent, RegisterForm],
  exports: [HeaderComponent, RegisterForm],
  providers: [EmployeeService]
})
export class ComponentModule { }
