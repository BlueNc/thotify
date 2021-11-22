import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThotCacheService, ThotNode } from '../thot-cache.service';

@Component({
  selector: 'thotify-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  error: any;

  pending: boolean = false;

  nodes: ThotNode[] = [];

  @Input() set value(value: string) {
    this.thotCacheService.find(value).subscribe(
      nodes => {
        this.nodes = nodes
        console.log(nodes)
        if (this.nodes.length === 1) {
          this.goToNodePage(this.nodes[0])
        }
      }
    )

  }

  constructor(
    private thotCacheService: ThotCacheService,
    private router: Router

  ) { }

  ngOnInit(): void {
  }

  goToNodePage(node: ThotNode) {
    this.router.navigate([], { queryParams: {
      page: node.type,
      value: node.name
    }})
  }

}
