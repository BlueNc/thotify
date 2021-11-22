import { Injectable } from '@angular/core';
import { ThotService } from './thot.service';
import { map, mergeMap, tap } from 'rxjs/operators';
import { from, Observable, scheduled, Subject } from 'rxjs';

export type ThotNode = {
  name: string
  type: string
}

@Injectable()
export class ThotCacheService {

  private nodes: ThotNode[] = [];

  constructor(private thotService: ThotService) { }

  refreshCache(): Observable<undefined> {
    let pending = new Subject<undefined>()

    let types = [
      {
        name: 'application',
        values: this.listApplicationName()
      },
      {
        name: 'server',
        values: this.listServerName()
      }
    ]

    this.nodes = []

    from(types).pipe(
      tap(type => console.log(`loading ${type.name}...`)),
      mergeMap(type => type.values.pipe(map(values => ({type, values}))))
    ).subscribe(
      data => {
        console.log(`loading ${data.type.name} complete`, data)
        this.nodes = this.nodes.concat(this.create_nodes(data.type.name, data.values))
      },
      err => console.error(err),
      () => {
        console.log('loading cache complete')
        console.log(this.nodes)
        pending.next()
        pending.complete()
      }
    )

    return pending.asObservable();
  }

  private create_nodes(type: string, values: string[]): ThotNode[] {
    return values.map<ThotNode>(
      name => ({name: name, type: type})
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

  find(name: string): Observable<ThotNode[]> {
    return this.refreshCache().pipe(
      map(() => {
        console.log(`search in cache '${name}'`)
        return this.nodes.filter(n => n.name === name)
      })
    )
  }
}
