import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';

import { MainContentComponent } from './components/main-content/main-content.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProductosComponent } from './components/productos/productos.component';
/*import { FacturasComponent } from './components/facturas/facturas.component';*/
const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'inicio',
    component: MainContentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clientes',
    component: ClientesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'productos',
    component: ProductosComponent,
    canActivate: [AuthGuard],
  },
  /*{
    path: 'facturas',
    component: FacturasComponent,
    canActivate: [AuthGuard],
  },*/
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
