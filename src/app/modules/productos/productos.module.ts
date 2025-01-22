import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductosRoutingModule } from './productos-routing.module';
import { ProductoListComponent } from './components/producto-list/producto-list.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { ProductoAddComponent } from './components/producto-add/producto-add.component';

@NgModule({
  declarations: [
    ProductoListComponent,
    ProductoFormComponent,
    ProductoAddComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductosRoutingModule,
  ],
})
export class ProductosModule {}
