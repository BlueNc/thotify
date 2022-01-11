import { Injectable } from '@angular/core';
import { ThotService } from './thot.service';
import { map, mergeMap, tap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, scheduled, Subject } from 'rxjs';

export type ThotNode = {
  name: string,
  type: string,
  icon: string
}

export type ThotNodeStats = {
  [type: string]: {
    length: number,
    type: string,
    icon: string
  }
}

@Injectable()
export class ThotCacheService {

  private cached_nodes = new BehaviorSubject<ThotNode[]>([]);

  private last_update: Date | undefined = undefined;

  constructor(private thotService: ThotService) { }

  refreshCache(): void {
    let types = [
      {
        name: 'application',
        values: this.listApplicationName(),
        icon: 'apps'
      },
      {
        name: 'server',
        values: this.listServerName(),
        icon: 'storage'
      },
      {
        name: 'component',
        values: this.listComponentName(),
        icon: 'settings_applications'
      }
    ]

    let nodes: ThotNode[] = []

    from(types).pipe(
      tap(type => console.log(`loading ${type.name}...`)),
      mergeMap(type => type.values.pipe(map(values => ({type, values})))),
    ).subscribe(
      data => {
        console.log(`loading ${data.type.name} complete`, data.values.length);
        nodes = nodes.concat(this.create_nodes(data.type.name, data.type.icon, data.values));
      },
      err => console.error(err),
      () => {
        console.log('loading cache complete');
        this.cached_nodes.next(nodes);
        this.last_update = new Date();
      }
    )
  }

  private create_nodes(type: string, icon: string, values: string[]): ThotNode[] {
    return values.map<ThotNode>(
      name => ({name: name, type: type, icon: icon})
    )
  }

  private listApplicationName(): Observable<string[]> {
    return this.thotService.listApplication().pipe(
      map(apps => apps.map(a => a.name))
    )
  }

  private listServerName(): Observable<string[]>  {
    return this.thotService.listServer().pipe(
      map(servers => servers.map(s => s.name))
    )
  }

  private listComponentName(): Observable<string[]>  {
    return this.thotService.listComponent().pipe(
      map(components => components.map(s => s.name))
    )
  }

  find(name: string): Observable<ThotNode[]> {
    return this.nodes.pipe(
      map(nodes => {
        console.log(`search in cache '${name}'`)
        return nodes.filter(n => n.name.includes(name))
      })
    )
  }

  get nodes(): Observable<ThotNode[]> {
    if (!this.last_update) {
      this.refreshCache();
    }
    return this.cached_nodes.asObservable();
  }

  get stats(): Observable<ThotNodeStats> {
    if (!this.last_update) {
      this.refreshCache();
    }
    return this.cached_nodes.pipe(
      map(nodes => nodes.reduce((stats, node) => {
        stats[node.type] = stats[node.type] || {icon: node.icon, length: 0}
        stats[node.type].length = stats[node.type].length + 1
        return stats
      }, {} as ThotNodeStats))
    );
  }
}

