import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  invokeSavedSearchFunction = new EventEmitter();
  subsVar: Subscription;
  constructor() { }

  onSavedSearchClick(savedCriteriaObj) {
    this.invokeSavedSearchFunction.emit(savedCriteriaObj);
  }
}
