import { Injectable } from '@angular/core';

import { TabItem } from '../models/tab-item'

@Injectable({
  providedIn: 'root'
})
export class TabItemService {

  constructor() { }

  public  getTabItem (): TabItem [] {
    return [
      new TabItem('Civilian', true),
      new TabItem('State', false)
    ]
  }
}
