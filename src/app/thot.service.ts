import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Server } from './server/server.model';
import { Application } from './application/application.model';
import { environment } from './../environments/environment';
import { ThotComponentDetail } from './component/component.model';
import { Installation } from './installation/installation.model';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';


@Injectable()
export class ThotService {
  thotUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getServer(name: string) {
    return this.http.get<Server>(`${this.thotUrl}/server/${name}`);
  }

  listServer() {
    return this.http.get<[Server]>(`${this.thotUrl}/server/`);
  }

  getApplication(name: string) {
    return this.http.get<Application>(`${this.thotUrl}/application/${name}`);
  }

  listApplication() {
    return this.http.get<[Application]>(`${this.thotUrl}/application/`);
  }

  getComponent(name: string) {
    name = name.replace(/\//gi, '::');
    return this.http.get<ThotComponentDetail>(`${this.thotUrl}/component/${name}`);
  }

  listComponent() {
    return this.http.get<[ThotComponentDetail]>(`${this.thotUrl}/component/`);
  }

  getInstallation(componentName: string, serverName: string) {
    //return this.http.get<Installation>(`${this.thotUrl}/component/${componentName}/installation/${serverName}`);
    return of<Installation>()
  }
}
