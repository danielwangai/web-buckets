import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent  {
  appName = 'Angular II';
  myBuckets: string;

  onClickGet() {
    this.myBuckets = 'Button Clicked';
  }
}
