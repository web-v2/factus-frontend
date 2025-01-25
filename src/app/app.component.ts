import { Component, computed, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from './core/services/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title: string = 'factus-frontend-v2';
  user: any = '';
  isLoginPage: boolean = false;
  constructor(public sidebarService: SidebarService, private router: Router) {
    this.router.events.subscribe(() => {
      this.isLoginPage = this.router.url === '/login';
    });
  }

  ngOnInit() {
    this.user = localStorage.getItem('userSession');
    if (this.user) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy(): void {
    //this.authService.logout();
    localStorage.removeItem('userSession');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expires_at');
  }
}
