import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ThotService } from '../thot.service';
import { DbRole } from './db-role.model';

@Component({
  selector: 'thotify-db-role',
  templateUrl: './db-role.component.html',
  styleUrls: ['./db-role.component.scss']
})
export class DbRoleComponent implements OnInit, OnDestroy {

  private sub: Subscription = new Subscription();
  role: DbRole|undefined;
  error: any;

  pending: boolean = false;

  constructor(
    private thotService: ThotService,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.sub.add(
      this.route.paramMap.pipe(
        filter(params => params.has('serverName')),
        filter(params => params.has('dbInstanceName')),
        filter(params => params.has('dbRoleName')),
        tap(_ => this.pending = true),
        tap(_ => this.error = undefined),
        switchMap(params => this.thotService.getDbRole(
          params.get('serverName') as string,
          params.get('dbInstanceName') as string,
          params.get('dbRoleName') as string))
      ).subscribe(
        role => {
          this.role = role;
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
