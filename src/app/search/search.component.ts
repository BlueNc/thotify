import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { ThotCacheService, ThotNode } from '../thot-cache.service';

@Component({
  selector: 'thotify-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  private sub: Subscription = new Subscription();

  pending: boolean = false;

  nodes: ThotNode[] = [];

  value: string = "";

  constructor(
    private thotCacheService: ThotCacheService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.sub.add(
      this.route.queryParamMap.pipe(
        map(params => params.get("value") || ""),
        tap(value => this.value = value),
        filter(value => Boolean(value)),
        tap(_ => this.pending = true),
        switchMap(value => this.thotCacheService.find(value))
      ).subscribe(
        nodes => {
          this.nodes = nodes;
          this.pending = false;
          if (this.nodes.length === 1) {
            this.goToNodePage(this.nodes[0]);
          }
        }
      ));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  goToNodePage(node: ThotNode) {
    this.router.navigate(node.routePath)
  }
}
