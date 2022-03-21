import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'thotify-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  public version: string = environment.version;

  constructor() { }

  ngOnInit(): void {
  }

  openThotify(): void {
    chrome.tabs.create({
      url: chrome.runtime.getURL('index.html')
    });
  }
}
