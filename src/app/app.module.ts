import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ThotService } from './thot.service';
import { MainComponent } from './main/main.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ApplicationComponent } from './application/application.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SearchComponent } from './search/search.component';
import { ThotCacheService } from './thot-cache.service';


@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    MainComponent,
    HeaderComponent,
    ApplicationComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  providers: [
    ThotService,
    ThotCacheService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
