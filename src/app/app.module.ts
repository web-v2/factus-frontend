import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import * as $ from 'jquery';
import 'select2';

import { AppComponent } from './app.component';
import { AuthGuard } from './core/guards/auth.guard';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule,
    SharedModule,
    DashboardModule,
  ],
  providers: [AuthGuard, SweetAlert2Module],
  bootstrap: [AppComponent],
})
export class AppModule {}
