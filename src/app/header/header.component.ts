import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CacheDialogComponent } from '../cache-dialog/cache-dialog.component';

@Component({
  selector: 'thotify-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  search: string = '';
  searchMode: boolean = false;

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  enterSearchMode() {
    this.searchMode = true
  }

  submitSearch(): void {
    this.router.navigate([], { queryParams: {
      page: 'search',
      value: this.search
    }})
  }

  showCache() {
    this.dialog.open(CacheDialogComponent, {restoreFocus: false});
  }
}
