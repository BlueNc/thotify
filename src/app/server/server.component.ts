import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators'
import { ThotService } from '../thot.service';

import { Server } from './server.model';


@Component({
  selector: 'thotify-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit, OnDestroy {

  server: Server|undefined;
  private sub: Subscription = new Subscription()

  @Input() set serverName(serverName: string) {
    this.thotService.getServer(serverName).subscribe(
      server => this.server = server
    );
  }

  constructor(
    private route: ActivatedRoute,
    private thotService: ThotService,
  ) { }


  ngOnInit(): void {
    this.sub.add(
      this.route.params.pipe(
        map( params => params["value"]),
        switchMap(serverName => this.thotService.getServer(serverName))
      ).subscribe(
        server => this.server = server,
        error => console.error(error)
      ));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
