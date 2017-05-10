import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import {IBucketlist} from '../../models/bucketlist';
import { BucketlistService } from '../all-bucketlists.service';

@Component({
  selector: 'bucket-list',
  moduleId: module.id,
  templateUrl: 'bucketlist-list.component.html',
  styleUrls: ['bucketlist-list.component.scss'],
})
export class BucketlistListComponent implements OnInit {
  bucketlists: IBucketlist[];
  errorMessage: string;
  addBucket: string = '';

  constructor (
    private bucketlistService: BucketlistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBucketlist();
  }

  getBucketlist() {
    this.bucketlistService.getBucketlists()
      .subscribe((bucketlists: IBucketlist[]) => {
          this.bucketlists = bucketlists;
          console.log(bucketlists);
        },
        (error: any) => this.errorMessage = <any>error
      );
  }

  getSingleBucket(id: number) {
    console.log("bucket id"+ id);
    this.router.navigate(['/bucketlist', id, 'items'])
  }

  createBucketlist(name: string): void {
    name = name.trim();
    if (!name) {
      console.log('name required');
      return;
    }
    this.bucketlistService.createBucketlist(name).subscribe(
      () => this.getBucketlist()
    );
  }
}
