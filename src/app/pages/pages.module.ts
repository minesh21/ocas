import { NgModule } from '@angular/core';
import { RegisterPage } from './register/register.component';
import { PagesRoutingModule } from './pages-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentModule } from '../components/component.module';

@NgModule({
  declarations: [
    RegisterPage
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgbModule.forRoot(),
    ComponentModule
  ],
  providers: [],
  bootstrap: []
})
export class PagesModule { }
