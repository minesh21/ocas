import { NgModule } from '@angular/core';
import { RegisterPage } from './register/register.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivityListPage } from './activity-list/activity-list.component';

const routes = [
  {path: '', component: RegisterPage},
  {path: 'list', component: ActivityListPage}
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
