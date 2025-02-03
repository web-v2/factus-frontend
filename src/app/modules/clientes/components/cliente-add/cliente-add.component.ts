import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import 'select2';
import { ClienteService } from 'src/app/modules/clientes/services/cliente.service';
import { Cliente } from 'src/app/modules/clientes/interfaces/cliente.interfaces';
import { MunicipioService } from 'src/app/core/services/municipio.service';
import { Municipio } from 'src/app/core/interfaces/municipio.interfaces';
import { TipoDocumentoService } from 'src/app/core/services/tipoDocumento.service';
import { TipoDocumentos } from 'src/app/core/interfaces/tipo-documentos.interfaces';
@Component({
  selector: 'app-cliente-add',
  templateUrl: './cliente-add.component.html',
})
export class ClienteAddComponent implements OnInit {
  @Output() cancelarFormulario = new EventEmitter<void>();
  municipios: Municipio[] = [];
  tipoDocumentos: TipoDocumentos[] = [];
  clienteNuevo: Cliente = {
    identification: '',
    dv: 0,
    company: '',
    trade_name: '',
    names: '',
    address: '',
    email: '',
    phone: '',
    legal_organization_id: 0,
    tribute_id: 0,
    identification_document_id: 0,
    municipality_id: 0,
  };
  legal_organization_id: number = 1;
  clienteForm!: FormGroup;
  municipioId: number | null = null;
  private nit = new Subject<string>();
  constructor(
    private clienteService: ClienteService,
    private municipioService: MunicipioService,
    private tipoDocumentoService: TipoDocumentoService,
    private fb: FormBuilder
  ) {
    this.nit
      .pipe(
        debounceTime(3000) // ajusta el tiempo
      )
      .subscribe((value) => {
        this.updateSurname(value);
      });
  }

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      legal_organization_id: ['', Validators.required],
      dv: [''],
      company: [''],
      trade_name: [''],
      identification_document_id: ['', Validators.required],
      identification: [
        '',
        [Validators.required, Validators.pattern(/^\d{7,10}$/)],
      ],
      names: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{7,10}$/)]],
      tribute_id: ['', Validators.required],
      municipality_id: [''],
    });

    this.clienteForm
      .get('legal_organization_id')
      ?.valueChanges.subscribe((value) => {
        if (value === '1') {
          this.clienteForm
            .get('dv')
            ?.setValidators([Validators.required, Validators.maxLength(1)]);
          this.clienteForm.get('company')?.setValidators([Validators.required]);
          this.clienteForm
            .get('trade_name')
            ?.setValidators([Validators.required, Validators.maxLength(50)]);
        } else {
          this.clienteForm.get('dv')?.clearValidators();
          this.clienteForm.get('company')?.clearValidators();
          this.clienteForm.get('trade_name')?.clearValidators();
        }
        this.clienteForm.get('dv')?.updateValueAndValidity();
        this.clienteForm.get('company')?.updateValueAndValidity();
        this.clienteForm.get('trade_name')?.updateValueAndValidity();
      });
    this.cargarMunicipios();
    this.cargarTipoDocumentos();
  }
  ngAfterViewInit(): void {
    $('#municipality').select2({
      theme: 'default',
      placeholder: 'Seleccione...',
    });
    $('#municipality').on('change', (event: any) => {
      const id = event.target.value;
      this.municipioId = +id;
      this.clienteNuevo.municipality_id = id;
      console.log('Municipio seleccionado:', this.municipioId);
    });
  }
  onSurnameChange(event: any): void {
    this.nit.next(event);
  }

  updateSurname(surname: string): void {
    const organization_id = this.clienteForm.get(
      'legal_organization_id'
    )?.value;
    if (organization_id == 1) {
      let dv = this.calcularDV(surname);
      this.clienteForm.get('dv')?.patchValue(dv);
    }
  }
  ngOnDestroy(): void {
    $('#municipality').select2('destroy');
  }

  cargarMunicipios(): void {
    this.municipioService.getMunicipiosMock().subscribe({
      next: (response) => {
        if (response) {
          this.municipios = response;
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
          title: `Error al obtener municipios: ${error.message}`,
        });
      },
    });
  }

  cargarTipoDocumentos(): void {
    this.tipoDocumentoService.getTipoDocumentos().subscribe({
      next: (response) => {
        if (response) {
          this.tipoDocumentos = response;
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
          title: `Error al obtener los tipos de documentos: ${error.message}`,
        });
      },
    });
  }

  cancelar(): void {
    this.cancelarFormulario.emit();
    this.clienteForm.reset();
  }

  guardarCambios(): void {
    if (this.clienteForm.valid) {
      this.clienteNuevo = this.clienteForm.value;
      this.clienteNuevo.municipality_id = this.municipioId
        ? this.municipioId
        : 0;
      if (this.clienteNuevo) {
        this.clienteService.newCliente(this.clienteNuevo).subscribe({
          next: () => {
            Swal.fire('Éxito', 'Cliente creado correctamente', 'success');
            this.cancelar();
          },
          error: (e) => {
            console.error('Error en el componente:', e);
            Swal.fire('Error', 'No se pudo crear el cliente', 'error');
          },
        });
      }
    } else {
      console.error('Formulario inválido');
    }
  }

  calcularDV(nit: string | number): number {
    const primes = [71, 67, 59, 53, 47, 43, 41, 37, 29, 23, 19, 17, 13, 7, 3];

    let nitStr = nit.toString();
    let sum = 0;
    let j = primes.length - nitStr.length; // Ajuste si el NIT es más corto que la lista de primos

    for (let i = 0; i < nitStr.length; i++) {
      sum += parseInt(nitStr[i], 10) * primes[j + i];
    }

    let remainder = sum % 11;
    return remainder < 2 ? remainder : 11 - remainder;
  }
}
