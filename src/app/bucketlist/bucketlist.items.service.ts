import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { IItem } from './bucketlist-items/item';

@Injectable()
export class BucketlistItemService {

    private bucketlistAPIUrl = 'http://127.0.0.1:5000';

    constructor(
        private http: Http
    ) { }

    getBucketlistItems(id: number): Observable<IItem[]> {
        return this._handleGetRequest(this.bucketlistAPIUrl + '/api/v1/bucketlists/'+id+'/items');
    }

    private _handleGetRequest(url: string) {
        let { token } = JSON.parse(localStorage.getItem('currentUser'));
        console.log(token);

        const headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': token
        });

        const options = new RequestOptions({ headers });

        return this.http.get(url, options)
            .map(this.extractData)
            .catch(this.handleError)
    }

    private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}