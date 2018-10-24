import { Component, OnInit } from '@angular/core';
import { Employee } from '../../interfaces/employee';
import { EmployeeService } from '../../services/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentModal } from '../../components/modals/comment-modal/comment-modal.component';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListPage implements OnInit {

  PAGE_SIZE = 24;
  MAX_SIZE = 5;

  loading: boolean;
  employees: Employee[];

  page = 1;
  start = 0;
  end = this.PAGE_SIZE;

  constructor(private employeeService: EmployeeService, private modal: NgbModal) { }

  ngOnInit() {
    this.getEmployees();
  }

  async getEmployees() {
    this.loading = true;
    this.employees = await this.employeeService.list();
    this.loading = false;
  }

  openCommentModal(comment) {
    const modalRef = this.openModal(CommentModal);
    modalRef.componentInstance.comment = comment;
  }

  openModal(component, options?) {
    return this.modal.open(component, options);
  }

  changePage(page) {
    this.page = page;
    this.start = ( (page - 1) * this.PAGE_SIZE);
    this.end = this.start + this.PAGE_SIZE;
  }
}
