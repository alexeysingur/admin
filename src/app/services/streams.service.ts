import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IUser } from '../model/iuser';

@Injectable({
  providedIn: 'root'
})
export class StreamsService {
  stream$: Subject<IUser> = new Subject<IUser>();

  searchStream$: Subject<string> = new Subject<string>();

  constructor() {
    this.stream$.next(null);
    this.searchStream$.next(null);
  }
}
