import { Component, Input, OnInit } from '@angular/core';
import { ThotService } from '../thot.service';
import { Application } from './application.model';

@Component({
  selector: 'thotify-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  application: Application|undefined;

  component_names = ''

  error: any;

  pending: boolean = false;

  @Input() set applicationName(applicationName: string) {
    this.pending = true;
    this.error = undefined;
    this.thotService.getApplication(applicationName).subscribe(
      application => {
        this.application = application;
        this.component_names = application.components.map(c => c.name).join(", ");
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
