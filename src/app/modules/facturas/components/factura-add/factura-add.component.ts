import {
  Component,
  OnInit,
  ChangeDetectorRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FacturaService } from '../../services/factura.service';
import { ClienteService } from 'src/app/modules/clientes/services/cliente.service';
import { Cliente } from 'src/app/modules/clientes/interfaces/cliente.interfaces';
import { ProductoService } from 'src/app/modules/productos/services/producto.service';
import { Producto } from 'src/app/modules/productos/interfaces/producto.interfaces';
import { MetodosPago } from 'src/app/core/interfaces/metodos-pago.interfaces';
import { MetodosPagoService } from 'src/app/core/services/metodosPago.service';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
@Component({
  selector: 'app-factura-add',
  templateUrl: './factura-add.component.html',
  styleUrls: ['./factura-add.component.css'],
})
export class FacturaAddComponent implements OnInit {
  @Output() cancelarFormulario = new EventEmitter<void>();
  facturaForm: FormGroup;
  dataCliente: Cliente | null = null;
  dataProducto: Producto[] = [];
  metodosPago: MetodosPago[] = [];

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private facturaService: FacturaService,
    private clienteService: ClienteService,
    private productoService: ProductoService,
    private metodosPagoService: MetodosPagoService,
    private router: Router
  ) {
    this.facturaForm = this.fb.group({
      numbering_range_id: [null, [Validators.required]],
      reference_code: ['', [Validators.required]],
      observation: ['', [Validators.maxLength(255)]],
      payment_method_code: ['', [Validators.required]],
      customer: this.fb.group({
        identification: ['', [Validators.required]],
        dv: [''],
        company: [''],
        trade_name: [''],
        names: ['', [Validators.required]],
        address: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]],
        legal_organization_id: ['', [Validators.required]],
        tribute_id: ['', [Validators.required]],
        identification_document_id: ['', [Validators.required]],
        municipality_id: ['', [Validators.required]],
      }),
      items: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.addItem();
    this.cargarMetodosPago();
  }

  get items(): FormArray {
    return this.facturaForm.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(
      this.fb.group({
        code_reference: ['', [Validators.required]],
        name: ['', [Validators.required]],
        quantity: [1, [Validators.required, Validators.min(1)]],
        discount_rate: [0, [Validators.min(0), Validators.max(100)]],
        price: [0, [Validators.required, Validators.min(0)]],
        tax_rate: [0],
        unit_measure_id: [70, [Validators.required]],
        standard_code_id: [1, [Validators.required]],
        is_excluded: [0, [Validators.required]],
        tribute_id: [null, [Validators.required]],
        withholding_taxes: this.fb.array([]),
      })
    );
  }

  fetchCliente(): void {
    const identification = $('#identification').val() as number;
    if (!identification) {
      Swal.fire(
        'Error',
        'Por favor ingresa una identificación válida',
        'error'
      );
      return;
    }

    this.clienteService.getClienteById(identification).subscribe({
      next: (cliente) => {
        if (cliente) {
          this.facturaForm.get('customer')?.patchValue(cliente);
          $('#dv').val('' + cliente.dv);
          $('#names').val(cliente.names);
          $('#address').val(cliente.address);
          $('#email').val(cliente.email);
          $('#phone').val(cliente.phone);
          this.cdr.detectChanges();
        }
        this.dataCliente = cliente;
      },
      error: () => {
        Swal.fire(
          'Error',
          'No se encontró un cliente con esa identificación',
          'warning'
        );
        this.facturaForm.get('customer')?.reset();
      },
    });
  }

  fetchProducto(i: number): void {
    const cod = this.items.at(i).get('code_reference')?.value as string;
    if (!cod) {
      Swal.fire('Error', 'Por favor ingresa una referencia válida', 'error');
      return;
    }

    this.productoService.getProductoById(cod).subscribe({
      next: (producto) => {
        if (producto) {
          $('#name_' + i).val(producto.name);
          $('#price_' + i).val(producto.price);

          this.items.at(i).patchValue({
            code_reference: producto.code_reference,
            name: producto.name,
            quantity: producto.quantity,
            discount_rate: 0,
            price: producto.price,
            tax_rate: '0.00',
            unit_measure_id: producto.unit_measure_id,
            standard_code_id: 1,
            is_excluded: producto.is_excluded,
            tribute_id: producto.tribute_id,
          });
        }
        /* console.log('Producto cargado:', producto);*/
        console.log('FormArray actual:', this.facturaForm.get('items')?.value);
      },
      error: () => {
        Swal.fire(
          'Error',
          'No se encontró un producto con esa refencia',
          'warning'
        );
        this.items.at(i).reset(); // Limpiar los campos del producto
      },
    });
  }

  newCliente(): void {
    this.router.navigate(['clientes']);
  }

  removeItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    } else {
      Swal.fire(
        'Error',
        'Debe haber al menos un producto en la factura',
        'warning'
      );
    }
  }

  getWithholdingTaxes(itemIndex: number): FormArray {
    return this.items.at(itemIndex).get('withholding_taxes') as FormArray;
  }

  addWithholdingTax(itemIndex: number): void {
    this.getWithholdingTaxes(itemIndex).push(
      this.fb.group({
        code: [''],
        withholding_tax_rate: [''],
      })
    );
  }

  removeWithholdingTax(itemIndex: number, taxIndex: number): void {
    this.getWithholdingTaxes(itemIndex).removeAt(taxIndex);
  }

  submitFactura(): void {
    console.log(this.facturaForm.value);
    if (this.facturaForm.invalid) {
      console.log(this.facturaForm.controls);
      Swal.fire(
        'Error',
        'El formulario tiene errores, por favor verifícalo',
        'error'
      );
      return;
    }

    const facturaData = this.facturaForm.value;
    this.facturaService.createFactura(facturaData).subscribe({
      next: (response) => {
        Swal.fire(
          'Éxito',
          `Factura ${response.bill.number} creada correctamente`,
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.cancelar();
          }
        });
        this.facturaForm.reset();
        this.items.clear();
        this.addItem();
      },
      error: (err) => {
        Swal.fire(
          'Error',
          'No se pudo crear la factura. Intenta de nuevo',
          'error'
        );
        console.error(err);
      },
    });
  }

  cargarMetodosPago(): void {
    this.metodosPagoService.getMetodosPago().subscribe({
      next: (response) => {
        if (response) {
          this.metodosPago = response;
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
          title: `Error al obtener los metodos de pagos: ${error.message}`,
        });
      },
    });
  }

  cancelar(): void {
    this.cancelarFormulario.emit();
  }
}
