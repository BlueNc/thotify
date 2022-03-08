import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { environment } from './../../environments/environment';


@Component({
  selector: 'thotify-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  private sub: Subscription = new Subscription();
  page: string = 'popup';
  value: string = '';
  searchValue: string = '';

  public version: string = environment.version;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }


  ngOnInit(): void {
    this.sub.add(
      this.route.queryParams.pipe(
        map(params => params["page"]),
        filter(Boolean)
      ).subscribe(
        page => this.page = page as string
      ));

    this.sub.add(
      this.route.queryParams.pipe(
        map(params => params["value"]),
        filter(Boolean)
      ).subscribe(
        value => this.value = value as string
      ));

    this.sub.add(
      this.route.queryParams.pipe(
        filter(params => params["page"] === 'search'),
        map(params => params["value"]),
      ).subscribe(
        value => this.searchValue = value as string
      ));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openThotify(): void {
    chrome.windows.create({
      url: chrome.runtime.getURL('index.html') + '?page=home'
    });
  }

  back(): void {
    this.location.back();
  }
}
