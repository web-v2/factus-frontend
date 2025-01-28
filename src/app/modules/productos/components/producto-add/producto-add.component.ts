import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { ProductoService } from 'src/app/modules/productos/services/producto.service';
import { UtilService } from 'src/app/core/services/utils.service';
import { Producto } from 'src/app/modules/productos/interfaces/producto.interfaces';
import { UnidadMedidas } from 'src/app/core/interfaces/unidad-medida.interfaces';
import { Tributos } from 'src/app/core/interfaces/tributos.interfaces';
@Component({
  selector: 'app-producto-add',
  templateUrl: './producto-add.component.html',
})
export class ProductoAddComponent implements OnInit {
  @Output() cancelarFormulario = new EventEmitter<void>();
  unidadMedidas: UnidadMedidas[] = [];
  tributos: Tributos[] = [];

  productoNuevo: Producto = {
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
    this.utilService.getUnidadMedidas().subscribe({
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
    this.utilService.getTributos().subscribe({
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
      this.productoNuevo = this.productoForm.value;
      if (this.productoNuevo) {
        this.productoService.newProducto(this.productoNuevo).subscribe({
          next: () => {
            Swal.fire('Éxito', 'Producto creado correctamente', 'success');
            this.cancelar();
          },
          error: (e) => {
            console.error('Error en el componente:', e);
            Swal.fire('Error', 'No se pudo crear el producto', 'error');
          },
        });
      }
    } else {
      console.error('Formulario inválido');
    }
  }
}
