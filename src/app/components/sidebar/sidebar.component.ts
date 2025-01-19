import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  constructor(
    public sidebarService: SidebarService,
    private router: Router,
    private authService: AuthService
  ) {}
  inicio() {
    this.router.navigate(['/inicio']);
  }
  clientes() {
    this.router.navigate(['/clientes']);
  }
  productos() {
    this.router.navigate(['/productos']);
  }
  facturas() {
    this.router.navigate(['/facturas']);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
