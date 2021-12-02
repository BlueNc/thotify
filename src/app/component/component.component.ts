import { Component, Input, OnInit } from '@angular/core';
import { ThotService } from '../thot.service';
import { ThotComponentDetail } from './component.model';

@Component({
  selector: 'thotify-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit {

  component: ThotComponentDetail|undefined;
  component_names = '';

  error: any;

  pending: boolean = false;

  @Input() set name(name: string) {
    this.pending = true;
    this.error = undefined;
    this.thotService.getComponent(name).subscribe(
      component => {
        this.component = component;
        this.component_names = component.application.components.map(c => c.name).join(", ");
        this.pending = false;
      },
      error => {
        this.error = error;
        this.pending = false;
      }
    );
  }

  constructor(
    private thotService: ThotService,
  ) { }


  ngOnInit(): void {
  }
}
