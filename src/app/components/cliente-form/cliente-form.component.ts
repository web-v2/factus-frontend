// src/app/components/cliente-form/cliente-form.component.ts
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Municipio } from 'src/app/interfaces/municipio.interfaces';
import { MunicipioService } from 'src/app/services/municipio.service';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import 'select2';
import { Cliente } from 'src/app/interfaces/cliente.interfaces';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
})
export class ClienteFormComponent implements OnInit {
  municipios: Municipio[] = [];
  @Input() clienteSeleccionado: Cliente | null = null;
  @Output() cancelarFormulario = new EventEmitter<void>();
  constructor(
    private clienteService: ClienteService,
    private municipioService: MunicipioService
  ) {}

  ngOnInit(): void {
    this.cargarMunicipios();
  }
  ngAfterViewInit(): void {
    $('#municipality').select2({
      theme: 'default',
      placeholder: 'Seleccione...',
    });
    $('#municipality').on('change', (event: any) => {
      const id = event.target.value;
      if (this.clienteSeleccionado) {
        this.clienteSeleccionado.municipality_id = id;
        console.log('Municipio seleccionado:', id);
      } else {
        console.error('clienteSeleccionado no está definido');
      }
    });
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

  cancelar(): void {
    this.clienteSeleccionado = null;
    this.cancelarFormulario.emit();
  }

  guardarCambios(): void {
    if (this.clienteSeleccionado) {
      this.clienteService.updateCliente(this.clienteSeleccionado).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Cliente actualizado correctamente', 'success');
          this.cancelar();
        },
        error: (e) => {
          console.error('Error en el componente:', e);
          Swal.fire('Error', 'No se pudo actualizar el cliente', 'error');
        },
      });
    }
  }
}
