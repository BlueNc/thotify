import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application/application.component';
import { ComponentComponent } from './component/component.component';
import { DbInstanceComponent } from './db-instance/db-instance.component';
import { DbRoleComponent } from './db-role/db-role.component';
import { HomeComponent } from './home/home.component';
import { InstallationComponent } from './installation/installation.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PopupComponent } from './popup/popup.component';
import { SearchComponent } from './search/search.component';
import { ServerComponent } from './server/server.component';
import { SkeletonLoaderComponent } from './skeleton-loader/skeleton-loader.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'loader',
        component: SkeletonLoaderComponent
      },
      {
        path: 'server/:serverName',
        component: ServerComponent
      },
      {
        path: 'application/:applicationName',
        component: ApplicationComponent
      },
      {
        path: 'component/:componentName',
        component: ComponentComponent
      },
      {
        path: 'component/:componentName/installation/:serverName',
        component: InstallationComponent
      },
      {
        path: 'server/:serverName/db_instance/:dbInstanceName',
        component: DbInstanceComponent
      },
      {
        path: 'server/:serverName/db_instance/:dbInstanceName/db_role/:dbRoleName',
        component: DbRoleComponent
      }
    ]
  },
  {
    path: 'popup',
    component: PopupComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class AppRoutingModule { }
