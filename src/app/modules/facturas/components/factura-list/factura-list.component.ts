//src/app/modules/facturas/components/factura-list/factura-list.component
import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../services/factura.service';
import { Facturas } from '../../interfaces/facturas.interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-factura-list',
  templateUrl: './factura-list.component.html',
  styleUrls: ['./factura-list.component.css'],
})
export class FacturaListComponent implements OnInit {
  facturas: Facturas = {
    data: [],
    pagination: {
      total: 0,
      per_page: 0,
      current_page: 0,
      last_page: 0,
      from: 0,
      to: 0,
      links: [],
    },
  };

  filtroName: string = '';
  filtroId: number = 0;

  facturaSeleccionada: Facturas | null = null;
  facturaNueva: boolean = false;

  constructor(private facturaService: FacturaService) {}

  ngOnInit(): void {
    this.cargarfacturas();
  }

  cargarfacturas(): void {
    this.facturaService.getFacturasMock().subscribe({
      next: (datafacturas: Facturas) => {
        if (
          datafacturas &&
          datafacturas.data &&
          Array.isArray(datafacturas.data)
        ) {
          this.facturas = datafacturas;
        } else {
          console.warn(
            'La API no devolvió un objeto Facturas válido:',
            datafacturas
          );
        }
      },
      error: (error) => {
        console.error('Error al obtener facturas:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar facturas',
          text: 'No se pudo conectar con el servidor. Intente nuevamente.',
        });
      },
    });
  }

  nuevafactura(): void {
    this.facturaNueva = true;
  }

  facturasFiltradas(): Facturas {
    if (!this.filtroId && !this.filtroName) {
      return this.facturas;
    }

    const filtroId = this.filtroId ? this.filtroId.toString() : null;
    const filtroName = this.filtroName ? this.filtroName.toLowerCase() : null;

    const facturasFiltradas = this.facturas.data.filter((factura) => {
      const cumpleFiltroId = filtroId
        ? factura.number.toString().includes(filtroId)
        : true;
      const cumpleFiltroName = filtroName
        ? factura.identification.toLowerCase().includes(filtroName)
        : true;

      return cumpleFiltroId && cumpleFiltroName;
    });

    return {
      ...this.facturas,
      data: facturasFiltradas,
    };
  }

  onCancelarFormulario(): void {
    this.cargarfacturas();
    this.facturaSeleccionada = null;
    this.facturaNueva = false;
  }

  verfactura(id: string): void {
    console.log('Factura a ver:' + id);
  }

  eliminarfactura(id: string): void {
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
        this.facturas.data = this.facturas.data.filter(
          (factura) => factura.number !== id
        );
        Swal.fire('¡Eliminado!', 'La factura ha sido eliminada.', 'success');
      }
    });
  }
}
