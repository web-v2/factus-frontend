//src/app/modules/clientes/components/cliente-list/cliente-list.component;
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../interfaces/cliente.interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];

  filtroName: string = '';
  filtroId: number = 0;

  clienteSeleccionado: Cliente | null = null;
  clienteNuevo: boolean = false;
  loader: boolean = true;
  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (dataClientes) => {
        if (dataClientes && Array.isArray(dataClientes)) {
          this.clientes = dataClientes;
        } else {
          console.warn('La API no devolvió un arreglo válido:', dataClientes);
        }
      },
      error: (error) => {
        this.loader = false;
        console.error('Error al obtener clientes:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar clientes',
          text: 'No se pudo conectar con el servidor. Intente nuevamente.',
        });
      },
    });
  }

  nuevoCliente(): void {
    this.clienteNuevo = true;
  }

  clientesFiltrados(): Cliente[] {
    if (!this.filtroId && !this.filtroName) {
      return this.clientes;
    }

    return this.clientes.filter((cliente) => {
      const cumpleFiltroId = this.filtroId
        ? cliente.identification.toString().includes(this.filtroId.toString())
        : true;
      const cumpleFiltroName = this.filtroName
        ? cliente.names.toLowerCase().includes(this.filtroName.toLowerCase())
        : true;

      return cumpleFiltroId && cumpleFiltroName;
    });
  }

  editarCliente(cliente: Cliente): void {
    Swal.fire('Editar cliente', `Cliente seleccionado: ${cliente.names}`).then(
      (result) => {
        if (result.isConfirmed) {
          this.clienteSeleccionado = { ...cliente };
        }
      }
    );
  }

  onCancelarFormulario(): void {
    this.cargarClientes();
    this.clienteSeleccionado = null;
    this.clienteNuevo = false;
  }

  eliminarCliente(id: number | string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientes = this.clientes.filter(
          (cliente) => cliente.identification !== id + ''
        );
        Swal.fire('¡Eliminado!', 'El cliente ha sido eliminado.', 'success');
      }
    });
  }
}
