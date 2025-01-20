import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
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
import { AuthGuard } from './guards/auth.guard';
import * as $ from 'jquery';
import 'select2';
//import { AuthInterceptor } from './interceptors/auth.interceptor';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { ClienteAddComponent } from './components/cliente-add/cliente-add.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoAddComponent } from './components/producto-add/producto-add.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    MainContentComponent,
    SidebarComponent,
    SearchBoxComponent,
    FooterComponent,
    ClientesComponent,
    ClienteFormComponent,
    ClienteAddComponent,
    ProductosComponent,
    ProductoAddComponent,
    ProductoFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
    LucideAngularModule.pick({
      Home,
      Trophy,
      BarChart2,
      Users,
      LogOut,
      Menu,
      Search,
    }),
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
    SweetAlert2Module,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
