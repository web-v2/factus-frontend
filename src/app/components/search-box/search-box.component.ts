//src/app/components/search-box.component.ts
import { Component } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-search-box',
  templateUrl: 'search-box.component.html',
})
export class SearchBoxComponent {
  constructor(public sidebarService: SidebarService) {}
}
