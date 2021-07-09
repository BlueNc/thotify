import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Server } from './server/server.model';

@Injectable()
export class ThotService {
  thotUrl = 'https://thot.ref.gnc';

  constructor(private http: HttpClient) { }

  getServer(serverName: string) {
    return this.http.get<Server>(`${this.thotUrl}/server/${serverName}`);
  }
}
