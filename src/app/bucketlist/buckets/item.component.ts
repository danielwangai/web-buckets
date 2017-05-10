import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Component, OnInit } from '@angular/core';
import {IBucketlist} from '../../models/bucketlist';
import { BucketlistService } from '../all-bucketlists.service';

@Component({
  selector: 'item-component',
  moduleId: module.id,
  template:  `<div>This is a child item</div>`
})
export class ItemComponent implements OnInit {


  constructor () {}

  ngOnInit(): void {
    // get the bucket list

  }
}
