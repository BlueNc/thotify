import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ThotService } from '../thot.service';

import { DbInstance, Server } from './server.model';


@Component({
  selector: 'thotify-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit, OnDestroy {

  private sub: Subscription = new Subscription();
  server: Server|undefined;
  db_instances: DbInstance[] = [];
  error: any;

  pending: boolean = false;

  constructor(
    private thotService: ThotService,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.sub.add(
      this.route.paramMap.pipe(
        map(params => params.get("serverName") || ""),
        tap(_ => this.pending = true),
        tap(_ => this.error = undefined),
        switchMap(serverName => forkJoin({
            server: this.thotService.getServer(serverName),
            db_instances: this.thotService.getDbInstances(serverName)
          })
        )
      ).subscribe(
        values => {
          this.server = values.server;
          this.db_instances = values.db_instances;
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
