import { Component, OnInit } from '@angular/core';
import { ThotCacheService, ThotNodeStats } from '../thot-cache.service';

@Component({
  selector: 'thotify-cache-dialog',
  templateUrl: './cache-dialog.component.html',
  styleUrls: ['./cache-dialog.component.scss']
})
export class CacheDialogComponent implements OnInit {

  public stats: ThotNodeStats | undefined = undefined;
  public pending: boolean = true;

  constructor(
    private cacheService: ThotCacheService
  ) { }

  ngOnInit(): void {
    this.cacheService.stats.subscribe(
      stats => {
        this.stats = stats;
        this.pending = false;
      }
    )
  }

  refreshCache(): void {
    this.cacheService.refreshCache();
  }

}
