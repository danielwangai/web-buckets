import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }  from './app.component';
import  { BucketlistListComponent } from './bucketlist/buckets/bucketlist-list.component';
import { BucketlistService } from './bucketlist/all-bucketlists.service';

// services
import { AuthenticationService } from './user/authentication.service';
import { BucketlistItemService } from './bucketlist/bucketlist.items.service.js';
import { AuthGuard } from './auth-guard.service';

// components
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/login/register.component';
import { ItemComponent } from './bucketlist/bucketlist-items/bucketlist.item.component';

// pipes
import { SearchPipe } from './app.pipes';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'bucketlist',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'bucketlist',
    canActivate: [ AuthGuard ],
    component: BucketlistListComponent,
    children: [
      {
        path: ':id/items',
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
    ItemComponent,
    RegisterComponent
  ],
  providers: [
    BucketlistService,
    AuthenticationService,
    AuthGuard,
    BucketlistItemService
    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
