import { NgModule } from '@angular/core';
import { RegisterPage } from './register/register.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes = [
  {path: '', component: RegisterPage}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
