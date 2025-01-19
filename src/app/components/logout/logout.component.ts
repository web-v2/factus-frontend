// src/app/components/logout/logout.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  userSS: string | null = '';
  isDropdownOpen: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  ngOnInit(): void {
    this.userSS = localStorage.getItem('userSession') ?? '';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
