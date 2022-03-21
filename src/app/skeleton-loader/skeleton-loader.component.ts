import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'thotify-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss']
})
export class SkeletonLoaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  range(length: number): number[] {
    return new Array(length)
  }

  random(min: number, max: number): number[] {
    return this.range(Math.floor(Math.random() * (max - min + 1) + min));
  }

}
