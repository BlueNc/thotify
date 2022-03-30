import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ThotService } from './thot.service';
import { MainComponent } from './main/main.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ApplicationComponent } from './application/application.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { SearchComponent } from './search/search.component';
import { ThotCacheService } from './thot-cache.service';
import { ComponentComponent } from './component/component.component';
import { LinkDirective } from './link.directive';
import { CacheDialogComponent } from './cache-dialog/cache-dialog.component';
import { InstallationComponent } from './installation/installation.component';
import { PopupComponent } from './popup/popup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { LoaderInterceptor } from './interceptors/loader-interceptor.service';
import { LoaderComponent } from './loader/loader.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SkeletonLoaderComponent } from './skeleton-loader/skeleton-loader.component';
import { DbInstanceComponent } from './db-instance/db-instance.component';
import { DbRoleComponent } from './db-role/db-role.component';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    MainComponent,
    HeaderComponent,
    ApplicationComponent,
    SearchComponent,
    ComponentComponent,
    LinkDirective,
    CacheDialogComponent,
    InstallationComponent,
    PopupComponent,
    NotFoundComponent,
    HomeComponent,
    LoaderComponent,
    SkeletonLoaderComponent,
    DbInstanceComponent,
    DbRoleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatListModule,
    MatDialogModule,
    NgxSkeletonLoaderModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ThotService,
    ThotCacheService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
