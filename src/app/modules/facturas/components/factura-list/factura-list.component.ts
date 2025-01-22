//src/app/modules/facturas/components/factura-list/factura-list.component
import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../services/factura.service';
import { Factura } from '../../interfaces/facturas.interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-factura-list',
  templateUrl: './factura-list.component.html',
  styleUrls: ['./factura-list.component.css'],
})
export class FacturaListComponent implements OnInit {
  facturas: Factura[] = [];

  filtroName: string = '';
  filtroId: number = 0;

  facturaSeleccionada: Factura | null = null;
  facturaNueva: boolean = false;

  constructor(private facturaService: FacturaService) {}

  ngOnInit(): void {
    this.cargarfacturas();
  }

  cargarfacturas(): void {
    this.facturaService.getFacturasMock().subscribe({
      next: (datafacturas) => {
        if (datafacturas && Array.isArray(datafacturas)) {
          this.facturas = datafacturas;
        } else {
          console.warn('La API no devolvió un arreglo válido:', datafacturas);
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

  facturasFiltradas(): Factura[] {
    if (!this.filtroId && !this.filtroName) {
      return this.facturas;
    }

    return this.facturas.filter((factura) => {
      const cumpleFiltroId = this.filtroId
        ? factura.reference_code.toString().includes(this.filtroId.toString())
        : true;
      const cumpleFiltroName = this.filtroName
        ? factura.reference_code
            .toLowerCase()
            .includes(this.filtroName.toLowerCase())
        : true;

      return cumpleFiltroId && cumpleFiltroName;
    });
  }

  onCancelarFormulario(): void {
    this.cargarfacturas();
    this.facturaSeleccionada = null;
    this.facturaNueva = false;
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
        this.facturas = this.facturas.filter(
          (factura) => factura.reference_code !== id
        );
        Swal.fire('¡Eliminado!', 'El factura ha sido eliminado.', 'success');
      }
    });
  }
}
