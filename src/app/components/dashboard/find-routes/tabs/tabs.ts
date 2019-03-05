import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { Tab } from '../tabs/tab';

@Component({
  selector: 'tabs',
  template:`
    <ul class="nav nav-tabs">
      <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <a href="#">{{tab.title}}</a>
      </li>
    </ul>
    <ng-content></ng-content>
  `
})
export class Tabs   {
  
  tabs: Tab[] = [];

  addTab(tab: Tab) {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }
  
  selectTab(tab: Tab){
    // deactivate all tabs
    this.tabs.forEach(tab => tab.active = false);
    
    // activate the tab the user has clicked on.
    tab.active = true;
  }

}