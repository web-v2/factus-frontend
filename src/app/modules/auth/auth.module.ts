// src/app/modules/auth/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [LoginComponent, LogoutComponent],
  declarations: [LoginComponent, LogoutComponent],
  providers: [],
})
export class AuthModule {}
