import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import * as $ from 'jquery';

import { TabPanesService } from './tabs/services/tab-pane.service';
import { TabItemService } from './tabs/services/tab-item.service';

import { TabItem } from './tabs/models/tab-item';
import { TabPaneItem } from './tabs/models/tab-pane-item';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CaseComponent {

  public tabPaneItems: TabPaneItem[];

  public tabItems: TabItem[];

  constructor ( private tabPanesService: TabPanesService, private tabItemService: TabItemService ) {

  }

    ngOnInit(){
      
      this.tabPaneItems = this.tabPanesService.getTabPanes();      
      this.tabItems = this.tabItemService.getTabItem();
      

    }

}
