import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'thotify-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  private sub: Subscription = new Subscription()
  page: string = 'home'
  value: string = ''

  constructor(
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.sub.add(
      this.route.queryParams.subscribe(
        params => {
          this.page = params["page"]
          this.value = params["value"]
        }
      ));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
