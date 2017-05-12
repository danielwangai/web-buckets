import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Router, ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import {IBucketlist} from '../../models/bucketlist';
import { BucketlistService } from '../all-bucketlists.service';
import { BucketlistItemService } from '../bucketlist.items.service';

declare var $: any;

@Component({
  selector: 'item-component',
  moduleId: module.id,
  templateUrl:  'bucketlist.item.component.html',
  styleUrls: ['bucketlist.item.component.css'],
})
export class ItemComponent implements OnInit {
  bucketlistId: number;

  addBucketItem: string = '';
  items: any[] = [];
  constructor (
    private route: ActivatedRoute,
    private bucketlistItem: BucketlistItemService,
    private router: Router
    ) {}

  ngOnInit(): void {
    // get the bucket list
    this.route.params.subscribe(params => {
      this.bucketlistId = params.id
      this.getBucketlistItems();
    })
  }

  addItem(bucketlist_id: number, itemName: string) {
    console.log("bucket id on click", bucketlist_id, ' plus ', itemName)
    itemName = itemName.trim();
    if (!itemName) {
      console.log("Set item name!!!");
      return
    }

    this.bucketlistItem.addItem(this.bucketlistId, itemName)
      .subscribe(
        () => this.getBucketlistItems()
      )
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

  deleteBucketlist() {
    this.bucketlistItem.deleteBucketlist(this.bucketlistId)
      .subscribe(response => {
        console.log(response);
      })
    this.router.navigate(['/bucketlist'])
  }

  openItemCreateDialog() {
    // modal for creating bucketlist item
    $('.ui.modal.item-create').modal('show');
  }
}
