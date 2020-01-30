import { Component, OnInit,  HostBinding, Input, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { TabItem } from './models/tab-item';
import { TabPaneItem } from './models/tab-pane-item';
import { TabsDirective } from './tabs.directive';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  @Input() tabItems : TabItem[];

  @Input() tabPanesItems : TabPaneItem[];

  @ViewChild(TabsDirective) tabPane :  TabsDirective;

  constructor( private componentFactoryResolver: ComponentFactoryResolver ) { }

  public loadTabPaneComponent(selectedIndex: number): void {
    const tabPaneItem = this.tabPanesItems[selectedIndex];
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(tabPaneItem.component);
    const tabPaneRef = this.tabPane.viewContainerRef;
    tabPaneRef.clear();

    tabPaneRef.createComponent(componentFactory);
}

  
  public onTabClicked(tabItem: TabItem): void {
    this.setActiveTabItem(tabItem);
}

public setActiveTabItem(tabItem: TabItem): void {
    this.tabItems.forEach((value: TabItem, index: Number) => {
        value.isSelected = false;
    });

    tabItem.isSelected = true;
    this.loadTabPaneComponent(this.tabItems.indexOf(tabItem));

}

  ngOnInit() {
    this.loadTabPaneComponent(0);
  }

}
