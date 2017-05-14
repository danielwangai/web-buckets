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
  bucketItemId: number;

  bucketItemName: string = '';
  isDone: boolean;
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

  addItem(itemName: string) {
    console.log("bucket id on click", this.bucketlistId, ' plus ', itemName)
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
      // fetch items from bucketlist with id $id
      this.bucketlistItem.getBucketlistItems(param.id).subscribe((items: any) => {
        this.items = items
        console.log(items)
      });
    })
  }

  // delete bucketlist item
  deleteBucketlistItem() {
    this.bucketlistItem.deleteBucketlistItem(
      this.bucketlistId, this.bucketItemId).subscribe(
        () => this.getBucketlistItems()
      )
  }

  deleteBucketlist() {
    this.bucketlistItem.deleteBucketlist(this.bucketlistId)
      .subscribe(response => {
        console.log(response);
      })
    this.router.navigate(['/bucketlists'])
  }

  updateBucketlistItem(itemName: string) {
    itemName = itemName.trim();
    if ( !itemName ) {
      console.log("Name required.")
      return
    }
    this.bucketlistItem.updateBucketlistItem(this.bucketlistId, this.bucketItemId, itemName, this.isDone)
      .subscribe(response => {
        console.log("update response")
        console.log(response)
        this.getBucketlistItems()
      })
  }

  openItemCreateDialog() {
    // modal for creating bucketlist item
    $('.ui.modal.item-create').modal('show');
  }

  openUpdateDialog(itemData: any) {
    this.bucketItemName = itemData.name
    this.bucketlistId = itemData.bucketlist_id,
    this.bucketItemId = itemData.id
    this.isDone = itemData.status
    // modal for creating bucketlist item
    $('.ui.modal.item-update').modal('show');
  }

  openDeleteDialog(item: any) {
    this.bucketlistId = item.bucketlist_id
    this.bucketItemId = item.id
    $('.small.modal.delete-item').modal('show');
  }
}
