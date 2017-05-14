import { Component } from '@angular/core';
import { AuthenticationService } from './user/authentication.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  appName = 'Angular II';
  myBuckets: string;

  constructor( 
    private authService: AuthenticationService 
    ) {

  }
  logout() {
    this.authService.logout();
  }
  onClickGet() {
    this.myBuckets = 'Button Clicked';
  }
}
