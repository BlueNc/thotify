import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'thotify-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  search: string = '';
  searchMode: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  enterSearchMode() {
    this.searchMode = true
  }

  searchServer(): void {
    this.router.navigate([], { queryParams: {
      page: 'search',
      value: this.search
    }})
  }

}
