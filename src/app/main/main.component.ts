import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  page: string = 'home';
  value: string = '';

  public version: string = environment.version;

  constructor(
    private route: ActivatedRoute
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
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
