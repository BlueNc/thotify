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

  searchValue: string = '';

  version: string = environment.version;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }


  ngOnInit(): void {
    this.sub.add(
      this.route.queryParamMap.pipe(
        filter(params => params.has("value")),
        map(params => params.get("value")),
      ).subscribe(
        value => this.searchValue = value as string
      ));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  back(): void {
    this.location.back();
  }
}
