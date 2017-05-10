import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { IUser } from './user';

@Injectable()
export class AuthenticationService {
  public token: string;
  baseUrl: string = 'http://127.0.0.1:5000';

  constructor(private http: Http) {
    // set token if saved in local storage
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  register(user: IUser) {
    return this.http.post(this.baseUrl + '/api/v1/auth/register', user);
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post('http://127.0.0.1:5000/api/v1/auth/login', {
      username: username, password: password
    })
      .map((response: Response) => {
        console.log(response.json());
        let { Authorization: token } = response.json();
        if (token) {
          // set token property
          this.token = token;
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      }
    );
  }
  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}
