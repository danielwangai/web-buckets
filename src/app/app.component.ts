import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{appName}}</h1>`,
})
export class AppComponent  { 
  appName = 'Angular II';
}
