import { BehaviorSubject } from 'rxjs';

export interface ICache {
  [key: string]: BehaviorSubject<any>;
}
