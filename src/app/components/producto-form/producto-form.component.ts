import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/interfaces/producto.interfaces';
import { UtilService } from 'src/app/services/utils.service';
import { UnidadMedidas } from 'src/app/interfaces/unidad-medida.interfaces';
import { Tributos } from 'src/app/interfaces/tributos.interfaces';
@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
})
export class ProductoFormComponent implements OnInit {
  @Input() productoSeleccionado: Producto | null = null;
  @Output() cancelarFormulario = new EventEmitter<void>();
  unidadMedidas: UnidadMedidas[] = [];
  tributos: Tributos[] = [];

  productoEditar: Producto = {
    code_reference: '',
    name: '',
    quantity: 0,
    discount_rate: 0,
    price: 0,
    tax_rate: '',
    unit_measure_id: 0,
    standard_code_id: 0,
    is_excluded: 0,
    tribute_id: 0,
    withholding_taxes: [],
  };
  productoForm!: FormGroup;
  constructor(
    private productoService: ProductoService,
    private utilService: UtilService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.cargarUnidadMedidas();
    this.cargarTributos();
    this.productoForm = this.fb.group({
      code_reference: ['', Validators.required],
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      discount_rate: [''],
      price: ['', Validators.required],
      tax_rate: [''],
      unit_measure_id: ['', [Validators.required]],
      standard_code_id: [''],
      is_excluded: ['', [Validators.required]],
      tribute_id: ['', [Validators.required]],
      withholding_taxes: [''],
    });
  }

  cargarUnidadMedidas(): void {
    this.utilService.getUnidadMedidasMock().subscribe({
      next: (response) => {
        if (response) {
          this.unidadMedidas = response;
        } else {
          console.warn(
            'La API respondió pero no retornó datos válidos:',
            response
          );
        }
      },
      error: (error) => {
        console.error('Error al conectar con la API:', error);
        Swal.fire({
          icon: 'error',
          title: `Error al obtener unidadMedidas: ${error.message}`,
        });
      },
    });
  }

  cargarTributos(): void {
    this.utilService.getTributosMock().subscribe({
      next: (response) => {
        if (response) {
          this.tributos = response;
        } else {
          console.warn(
            'La API respondió pero no retornó datos válidos:',
            response
          );
        }
      },
      error: (error) => {
        console.error('Error al conectar con la API:', error);
        Swal.fire({
          icon: 'error',
          title: `Error al obtener tributos: ${error.message}`,
        });
      },
    });
  }

  cancelar(): void {
    this.cancelarFormulario.emit();
    this.productoForm.reset();
  }

  guardarCambios(): void {
    if (this.productoForm.valid) {
      this.productoSeleccionado = this.productoForm.value;
      if (this.productoSeleccionado) {
        this.productoService
          .updateProducto(this.productoSeleccionado)
          .subscribe({
            next: () => {
              Swal.fire(
                'Éxito',
                'Producto actualizado correctamente',
                'success'
              );
              this.cancelar();
            },
            error: (e) => {
              console.error('Error en el componente:', e);
              Swal.fire('Error', 'No se pudo actualizar el producto', 'error');
            },
          });
      }
    } else {
      console.error('Formulario inválido');
    }
  }
}
