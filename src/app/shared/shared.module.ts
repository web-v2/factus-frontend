import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AuthModule } from '../modules/auth/auth.module';
import {
  LucideAngularModule,
  Home,
  Trophy,
  BarChart2,
  Users,
  LogOut,
  Menu,
  Search,
} from 'lucide-angular';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';

@NgModule({
  declarations: [
    MainContentComponent,
    SidebarComponent,
    SearchBoxComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    LucideAngularModule.pick({
      Home,
      Trophy,
      BarChart2,
      Users,
      LogOut,
      Menu,
      Search,
    }),
    AuthModule,
  ],
  exports: [
    MainContentComponent,
    SidebarComponent,
    SearchBoxComponent,
    FooterComponent,
  ],
})
export class SharedModule {}
