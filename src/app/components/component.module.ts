import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RegisterForm } from './forms/register-form/register-form.component';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { PagesRoutingModule } from '../pages/pages-routing.module';
import { CommentModal } from './modals/comment-modal/comment-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PagesRoutingModule,
    NgbModule
  ],
  declarations: [HeaderComponent, RegisterForm, CommentModal, LoaderComponent],
  entryComponents: [CommentModal],
  exports: [HeaderComponent, RegisterForm, LoaderComponent],
  providers: [EmployeeService]
})
export class ComponentModule { }
