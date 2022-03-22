import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from  'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CacheDialogComponent } from '../cache-dialog/cache-dialog.component';

@Component({
  selector: 'thotify-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public version: string = environment.version;

  searchControl = new FormControl();
  searchMode: boolean = false;

  private sub: Subscription = new Subscription();


  @Input() set searchValue(value: string) {
    this.searchControl.setValue(value, { emitEvent: false });
  }


  constructor(
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(600)
    ).subscribe(_ => this.submitSearch());
  }

  enterSearchMode() {
    this.searchMode = true
  }

  submitSearch(): void {
    this.router.navigate(['search'], { queryParams: {
      value: this.searchControl.value
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
