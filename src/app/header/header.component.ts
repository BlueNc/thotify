import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from  'rxjs/operators';
import { CacheDialogComponent } from '../cache-dialog/cache-dialog.component';

@Component({
  selector: 'thotify-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  search: string = '';
  searchControl = new FormControl();
  searchMode: boolean = false;

  private sub: Subscription = new Subscription();


  @Input() set searchValue(value: string) {
    this.search = value;
  }


  constructor(
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(400)
    ).subscribe(value => this.submitSearch(value as string));
  }

  enterSearchMode() {
    this.searchMode = true
  }

  submitSearch(value: string): void {
    this.router.navigate([], { queryParams: {
      page: 'search',
      value: value
    }})
  }

  showCache() {
    this.dialog.open(CacheDialogComponent, {restoreFocus: false});
  }

  goHome() {
    this.router.navigate([], { queryParams: {
      page: 'home'
    }})
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
