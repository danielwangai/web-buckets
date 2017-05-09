import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import  { BucketlistListComponent } from './bucketlist/bucketlist-list.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, BucketlistListComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
