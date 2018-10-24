import { Component, OnInit } from '@angular/core';
import {LocationStrategy} from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router, UrlSegment} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  active: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((url: NavigationEnd) => {
      this.active = url.url;
    });
  }

}
