import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ThotService } from '../thot.service';
import { DbInstanceDetail, Role } from './db-instance.model';

export type RolesByType = {[type: string]: Role[]}

@Component({
  selector: 'thotify-db-instance',
  templateUrl: './db-instance.component.html',
  styleUrls: ['./db-instance.component.scss']
})
export class DbInstanceComponent implements OnInit, OnDestroy {

  private sub: Subscription = new Subscription();
  instance: DbInstanceDetail|undefined;
  rolesByType: RolesByType = {};
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
        tap(_ => this.pending = true),
        tap(_ => this.error = undefined),
        switchMap(params => this.thotService.getDbInstance(params.get('serverName') as string, params.get('dbInstanceName') as string))
      ).subscribe(
        instance => {
          this.instance = instance;
          this.rolesByType = instance.roles.reduce((res: RolesByType, role: Role) => {
            res[role.type] = [...res[role.type] || [], role];
            return res
          }, {});
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
