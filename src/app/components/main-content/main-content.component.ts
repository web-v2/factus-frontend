import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
})
export class MainContentComponent {
  constructor(private router: Router) {}

  clientes(): void {
    this.router.navigate(['/clientes']);
  }
  productos(): void {
    this.router.navigate(['/productos']);
  }
  facturas(): void {
    this.router.navigate(['/facturas']);
  }
}
