import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private sidebarVisible = new BehaviorSubject<boolean>(
    window.innerWidth > 768
  );
  sidebarVisible$ = this.sidebarVisible.asObservable();

  constructor() {
    window.addEventListener('resize', this.updateSidebarVisibility.bind(this));
  }

  toggleSidebar() {
    this.sidebarVisible.next(!this.sidebarVisible.value);
  }

  private updateSidebarVisibility() {
    const isMobile = window.innerWidth <= 768;
    this.sidebarVisible.next(!isMobile);
  }
}
