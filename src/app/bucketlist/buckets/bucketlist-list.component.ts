import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import {IBucketlist} from '../../models/bucketlist';
import { BucketlistService } from '../all-bucketlists.service';

declare var $: any;

@Component({
  selector: 'bucket-list',
  moduleId: module.id,
  templateUrl: 'bucketlist-list.component.html',
  styleUrls: ['bucketlist-list.component.css'],
})
export class BucketlistListComponent implements OnInit {
  bucketlists: IBucketlist[] = [];
  bucketlistId: number;
  errorMessage: string;
  addBucket: string = '';
  searchTerm: string = '';

  bucket_name: string;

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

  deleteBucket(bucketlistId: number) {
    // delete bucketlist
    this.bucketlistService.deleteBucketlist(bucketlistId)
      .subscribe(res  =>{
        this.getBucketlist();
        console.log("Deleted params", res)
      })
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

  updateBucketlist(bucketName: string) {
    // update a bucketlist
    bucketName = bucketName.trim();
    if (! bucketName ) {
      console.log('name required');
      return;
    }
    this.bucketlistService.updateBucketlist(this.bucketlistId, bucketName)
      .subscribe(
        response => {
          console.log("Update response")
          console.log(response)
          this.getBucketlist()
        }
      )
  }

  openCreateDialog() {
    $('.ui.modal.bucket-create').modal('show');
  }

  openUpdateDialog(bucketlist: any) {
    this.bucketlistId = bucketlist.id;
    this.bucket_name = bucketlist.name;
    $('.ui.modal.bucket-update').modal('show');
  }
}
