import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ThotService } from './thot.service';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ThotService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
