import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ThotService } from '../thot.service';
import { Installation } from './installation.model';


@Component({
  selector: 'thotify-installation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.scss']
})
export class InstallationComponent implements OnInit, OnDestroy {

  private sub: Subscription = new Subscription();

  installation: Installation|undefined;
  error: any;

  pending: boolean = false;

  constructor(
    private thotService: ThotService,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.sub.add(
      this.route.paramMap.pipe(
        filter(params => params.has('componentName')),
        filter(params => params.has('serverName')),
        tap(_ => this.pending = true),
        tap(_ => this.error = undefined),
        switchMap(params => this.thotService.getInstallation(params.get('componentName') as string, params.get('serverName') as string))
      ).subscribe(
        installation => {
          this.installation = installation;
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
