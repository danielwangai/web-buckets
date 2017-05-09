import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
      <button (click)="onClickGet()">Test List Buckets</button>
      <p>{{ myBuckets }}</p>
      <bucket-list>Loading your bucketlists.</bucket-list>
  `
})
export class AppComponent  {
  appName = 'Angular II';
  myBuckets: string;

  onClickGet() {
    this.myBuckets = 'Button Clicked';
  }
}
