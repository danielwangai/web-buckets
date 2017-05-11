import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Router, ActivatedRoute } from '@angular/router';

import { Component, OnInit, Input } from '@angular/core';
import {IBucketlist} from '../../models/bucketlist';
import { BucketlistService } from '../all-bucketlists.service';
import { BucketlistItemService } from '../bucketlist.items.service';

@Component({
  selector: 'item-component',
  moduleId: module.id,
  templateUrl:  'bucketlist.item.component.html',
})
export class ItemComponent implements OnInit {
  @Input() bucketlist: IBucketlist;

  items: any[] = [];
  constructor (
    private route: ActivatedRoute,
    private bucketlistItem: BucketlistItemService
    ) {}

  ngOnInit(): void {
    // get the bucket list
    this.getBucketlistItems();
  }

  getBucketlistItems() {
    this.route.params.subscribe(param => {
      // console.log('param', param.id);
      // fetch items from bucketlist with id $id
      this.bucketlistItem.getBucketlistItems(param.id).subscribe((items: any) => {
        this.items = items
        console.log(items)
      });
    })
  }

  // delete bucketlist item
  deleteBucketlistItem(bucketlist_id: number, item_id: number) {
    this.bucketlistItem.deleteBucketlistItem(
      bucketlist_id, item_id).subscribe(
        () => this.getBucketlistItems()
      )

  }
}
