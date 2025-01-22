import { Component, computed, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from './core/services/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
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
      this.router.navigate(['/inicio']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
