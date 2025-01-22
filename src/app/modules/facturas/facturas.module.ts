import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacturasRoutingModule } from './facturas-routing.module';
import { FacturaListComponent } from './components/factura-list/factura-list.component';
import { FacturaAddComponent } from './components/factura-add/factura-add.component';
import { FacturaFormComponent } from './components/factura-form/factura-form.component';

@NgModule({
  declarations: [
    FacturaListComponent,
    FacturaAddComponent,
    FacturaFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FacturasRoutingModule,
  ],
})
export class FacturasModule {}
