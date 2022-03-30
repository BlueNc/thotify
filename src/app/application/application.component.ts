import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ThotService } from '../thot.service';
import { Application } from './application.model';

@Component({
  selector: 'thotify-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit, OnDestroy {

  private sub: Subscription = new Subscription();
  application: Application|undefined;

  component_names: string[] = []

  error: any;

  pending: boolean = false;

  constructor(
    private thotService: ThotService,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.sub.add(
      this.route.paramMap.pipe(
        map(params => params.get("applicationName") || ""),
        tap(_ => this.pending = true),
        tap(_ => this.error = undefined),
        switchMap(applicationName => this.thotService.getApplication(applicationName))
      ).subscribe(
        application => {
          this.application = application;
          this.component_names = application.components.map(c => c.name);
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

  getDiagramUrl(env: string): string {
    return `https://thot.ref.gnc/application/${this.application?.name}/diagram?env=${env}`
  }

  getDexUrl(): string {
    return `https://confluence.prod.gnc/display/KBINFRAS/DEX+${this.application?.name}`
  }
}
