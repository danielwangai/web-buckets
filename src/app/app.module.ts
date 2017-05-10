import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }  from './app.component';
import  { BucketlistListComponent } from './bucketlist/bucketlist-list.component';
import { BucketlistService } from './bucketlist/all-bucketlists.service';

// services
import { AuthenticationService } from './user/authentication.service';

// components
import { LoginComponent } from './user/login/login.component';
import { ItemComponent } from './bucketlist/item.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'buckelist',
    // canActivate: [],
    component: BucketlistListComponent,
    children: [
      {
        path: ':id',
        component: ItemComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    BucketlistListComponent,
    LoginComponent,
    ItemComponent
  ],
  providers: [ BucketlistService, AuthenticationService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
