import { Injectable } from '@angular/core';
import { TabPaneItem } from '../models/tab-pane-item';
import { ComplainantComponent } from '../../complainant/complainant.component';
import { DefendantComponent } from '../../defendant/defendant.component';

@Injectable({
  providedIn: 'root'
})
export class TabPanesService {

  constructor() { }

  public getTabPanes(): TabPaneItem[] {
    return [
      new TabPaneItem(ComplainantComponent),
      new TabPaneItem(DefendantComponent)
    ]
  }
}
