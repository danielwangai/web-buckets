import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { IBucketlist } from '../models/bucketlist';

@Injectable()
export class BucketlistService {
  private bucketlistAPIUrl = 'http://127.0.0.1:5000/api/v1/bucketlists';  // URL to web API

  constructor(private http: Http) {}

  getBucketlists(): Observable<IBucketlist[]> {
      // load with page 1 as default
      return this._handleGetRequest(this.bucketlistAPIUrl+'?page=1&limit=5');
  }

  nextPageBucketlists(nextPage: number): Observable<IBucketlist[]> {
      // Load buckets of the next page
      return this._handleGetRequest(this.bucketlistAPIUrl+'?page='+ nextPage+ '&limit=5');
  }

  createBucketlist(data: any) {
    return this._handlePostRequest(this.bucketlistAPIUrl, data);
  }

  getSingleBucketlist(id: number) {
    return this._handleGetRequest(this.bucketlistAPIUrl + '/'+ id);
  }

  deleteBucketlist(bucketlistId: number) {
    return this._handleDeleteRequest(this.bucketlistAPIUrl + '/'+ bucketlistId);
  }

  updateBucketlist(bucketlistId: number, bucketName: any) {
    return this._handlePutRequest(this.bucketlistAPIUrl + '/' + bucketlistId, bucketName)
  }

  // ### Helper functions
  private _handleGetRequest(url: string) {
    let { token } = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(token);

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': token
    });

    const options = new RequestOptions({ headers });

    return this.http.get(url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private _handlePostRequest(url: string, data: any) {
    let { token } = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(token);

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': token
    });

    const options = new RequestOptions({ headers });

    return this.http.post(url, JSON.stringify({'name': data}), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private _handleDeleteRequest(url: string) {
      let { token } = JSON.parse(localStorage.getItem('currentUser'));
        const headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': token
        });

        const options = new RequestOptions({ headers });

        return this.http.delete(url, options)
          .map(this.extractData)
          .catch(this.handleError)
    }

  private _handlePutRequest(url: string, bucketName: any) {
    let { token } = JSON.parse(localStorage.getItem('currentUser'));
    console.log(token);

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': token
    });

    const options = new RequestOptions({ headers });

    return this.http.put(url, JSON.stringify({'name': bucketName}), options)
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
