import { Injectable } from '@angular/core';
import { ThotService } from './thot.service';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable } from 'rxjs';

export type ThotNode = {
  name: string,
  type: string,
  icon: string,
  page: string,
  routePath: any[],
  description: string,
  class: string
}


export type ThotNodeStats = {
  [type: string]: {
    length: number,
    icon: string,
    class: string
  }
}

@Injectable()
export class ThotCacheService {

  private loaded = false;

  private cached_nodes = new BehaviorSubject<ThotNode[]>([]);

  public lastUpdate: Date | undefined = undefined;

  constructor(private thotService: ThotService) { }

  refreshCache(): void {
    let node_types = [
      this.listApplicationName(),
      this.listServers(),
      this.listComponentName(),
    ]

    let nodes: ThotNode[] = []

    from(node_types).pipe(
      mergeMap(node_type => node_type)
    ).subscribe(
      values => {
        nodes = nodes.concat(values);
      },
      err => console.error(err),
      () => {
        console.log('loading cache complete');
        this.loaded = true;
        this.cached_nodes.next(nodes);
        this.lastUpdate = new Date();
      }
    )
  }

  private listApplicationName(): Observable<ThotNode[]> {
    return this.thotService.listApplication().pipe(
      tap(type => console.log(`loading applications...`)),
      map(apps => apps.map(a => ({
        name: a.name,
        routePath: ['application', a.name],
        type: 'application',
        page: 'application',
        icon: 'apps',
        description: 'application',
        class: 'application'
      }))),
    )
  }

  private listServers(): Observable<ThotNode[]>  {
    return this.thotService.listServer().pipe(
      map(servers => {
        let serverNames = servers.map(s => ({
          name: s.name,
          routePath: ['server', s.name],
          type: 'server',
          icon: 'storage',
          page: 'server',
          description: 'server',
          class: 'server'
        }));
        let ipAddress = servers.reduce((ips, server) => {
          let currIps = server.ip.map(ip => ({
            name: ip,
            routePath: ['server', server.name],
            type: 'IP address',
            icon: 'alternate_email',
            page: 'server',
            description: server.name,
            class: 'ip'
          }));
          return ips.concat(currIps);
        }, [] as ThotNode[]);
        let virtualIpAddress = servers.reduce((ips, server) => {
          let currIps = server.virtual_ips.map(ip => ({
            name: ip,
            routePath: ['server', server.name],
            type: 'Virtual IP address',
            icon: 'alternate_email',
            page: 'server',
            description: server.name,
            class: 'virtual_ip'
          }));
          return ips.concat(currIps);
        }, [] as ThotNode[]);

        return [...serverNames, ...ipAddress, ...virtualIpAddress]
      })
    )
  }

  private listComponentName(): Observable<ThotNode[]>  {
    return this.thotService.listComponent().pipe(
      tap(type => console.log(`loading components...`)),
      map(components => components.map(c => ({
        name: c.name,
        routePath: ['component', c.name],
        type: 'component',
        icon: 'settings_applications',
        page: 'component',
        description: 'component',
        class: 'component'
      })))
    )
  }

  find(name: string): Observable<ThotNode[]> {
    return this.nodes.pipe(
      map(nodes => {
        console.log(`search in cache '${name}'`);
        return nodes.filter(node => this.smartMatch(node, name))
      })
    )
  }

  smartMatch(node: ThotNode, value: string): boolean {
    const terms = value.trim().toLowerCase().split(' ');
    return terms.every(term => node.name.toLowerCase().includes(term))
  }

  get nodes(): Observable<ThotNode[]> {
    if (!this.lastUpdate) {
      this.refreshCache();
    }
    return this.cached_nodes.pipe(filter(_ => this.loaded));
  }

  get stats(): Observable<ThotNodeStats> {
    if (!this.lastUpdate) {
      this.refreshCache();
    }
    return this.cached_nodes.pipe(
      map(nodes => nodes.reduce((stats, node) => {
        stats[node.type] = stats[node.type] || {icon: node.icon, class: node.class, length: 0}
        stats[node.type].length = stats[node.type].length + 1
        return stats
      }, {} as ThotNodeStats))
    );
  }
}

