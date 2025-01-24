import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacturasRoutingModule } from './facturas-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FacturaListComponent } from './components/factura-list/factura-list.component';
import { FacturaAddComponent } from './components/factura-add/factura-add.component';
import { FacturaFormComponent } from './components/factura-form/factura-form.component';
import { TablePaginationComponent } from './components/table-pagination/table-pagination.component';
@NgModule({
  declarations: [
    FacturaListComponent,
    FacturaAddComponent,
    FacturaFormComponent,
    TablePaginationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FacturasRoutingModule,
    SharedModule,
  ],
})
export class FacturasModule {}
