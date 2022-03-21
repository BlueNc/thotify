import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ThotService } from '../thot.service';

import { Server } from './server.model';


@Component({
  selector: 'thotify-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit, OnDestroy {

  private sub: Subscription = new Subscription();
  server: Server|undefined;
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
        switchMap(serverName => this.thotService.getServer(serverName))
      ).subscribe(
        server => {
          this.server = server;
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
