import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThotCacheService, ThotNode } from '../thot-cache.service';

@Component({
  selector: 'thotify-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  pending: boolean = false;

  nodes: ThotNode[] = [];

  private _value: string = "";

  @Input() set value(value: string) {
    this._value = value
    if (this._value) {
      this.pending = true;
      this.thotCacheService.find(value).subscribe(
        nodes => {
          this.nodes = nodes;
          this.pending = false;
          if (this.nodes.length === 1) {
            this.goToNodePage(this.nodes[0]);
          }
        }
      )
    }
  }

  get value() {
    return this._value;
  }

  constructor(
    private thotCacheService: ThotCacheService,
    private router: Router

  ) { }

  ngOnInit(): void {
  }

  goToNodePage(node: ThotNode) {
    this.router.navigate([], { queryParams: {
      page: node.page,
      value: node.value
    }})
  }

}
