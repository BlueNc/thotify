import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ThotService } from '../thot.service';
import { ThotComponentDetail } from './component.model';

@Component({
  selector: 'thotify-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit, OnDestroy {

  private sub: Subscription = new Subscription();

  component: ThotComponentDetail|undefined;

  component_names: string[] = [];

  error: any;

  pending: boolean = false;

  constructor(
    private thotService: ThotService,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.sub.add(
      this.route.paramMap.pipe(
        map(params => params.get("componentName") || ""),
        tap(_ => this.pending = true),
        tap(_ => this.error = undefined),
        switchMap(componentName => this.thotService.getComponent(componentName))
      ).subscribe(
        component => {
          this.component = component;
          if (component.application) {
            this.component_names = component.application.components.map(c => c.name);
          } else {
            this.component_names = []
          }
          this.pending = false;
        },
        error => {
          this.error = error;
          this.pending = false;
        }
      ));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
