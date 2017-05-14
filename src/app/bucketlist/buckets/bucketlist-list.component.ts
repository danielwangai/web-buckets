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
  // pagination variables
  nextPage: any;
  prevPage: any;

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
          this.bucketlists = bucketlists.bucketlists;
          // update pagination pages
          this.nextPage = bucketlists.next_page_number
          this.prevPage = bucketlists.prev_page_number
          console.log("params fetch paginate");
          console.log(bucketlists.bucketlists);
          console.log("Pagination values");
          console.log(this.nextPage);
          console.log(this.prevPage);
        },
        (error: any) => this.errorMessage = <any>error
      );
  }

  getSingleBucket(id: number) {
    console.log("bucket id"+ id);
    this.router.navigate(['/bucketlists', id, 'items'])
  }

  // next bucket page
  nextBucketPage() {
      this.bucketlistService.nextPageBucketlists(this.nextPage)
        .subscribe((bucketlists: IBucketlist[]) => {
            this.bucketlists = bucketlists.bucketlists;
            // update pagination pages
            this.nextPage = bucketlists.next_page_number
            this.prevPage = bucketlists.prev_page_number
            console.log("nextPage params")
            console.log(bucketlists)
        },
        (error: any) => this.errorMessage = <any>error
    )
  }

  deleteBucket() {
    // delete bucketlist
    this.bucketlistService.deleteBucketlist(this.bucketlistId)
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
    console.log("Bucket name");
    console.log(name);
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

  deleteConfirmationDialog(bucketlist: any) {
    this.bucketlistId = bucketlist.id
    $('.small.modal.delete-bucket').modal('show');
  }
}
