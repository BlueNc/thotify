import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { throttleTime } from 'rxjs/operators';
import { ThotService } from '../thot.service';

import { Server } from './server.model';


@Component({
  selector: 'thotify-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit, OnDestroy {

  server: Server|undefined;
  error: any;

  pending: boolean = false;

  @Input() set serverName(serverName: string) {
    this.pending = true;
    this.error = undefined;
    this.thotService.getServer(serverName).subscribe(
      server => {
        this.server = server;
        this.pending = false;
      },
      error => {
        this.error = error;
        console.log(error)
        this.pending = false;
      }
    );
  }

  constructor(
    private thotService: ThotService,
  ) { }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
