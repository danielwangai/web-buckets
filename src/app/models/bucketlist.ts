import { IItem } from './item';

export interface IBucketlist {
  id: number;
  name: string;
  items: IItem[];
  created_by: number;
  modified_at: string;
  created_at: string;
}
