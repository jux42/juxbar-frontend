import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor() { }

  private favouriteRemovedSource = new Subject<{id: number, type : string}>();
  favouriteRemoved$ = this.favouriteRemovedSource.asObservable();

  announceFavouriteRemoved(id: number, type: string) {
    this.favouriteRemovedSource.next({id, type});
  }
}
