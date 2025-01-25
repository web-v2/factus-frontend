//src/app/modules/facturas/components/factura-list/factura-list.component
import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../services/factura.service';
import {
  Datum,
  Facturas,
  Pagination,
} from '../../interfaces/facturas.interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-factura-list',
  templateUrl: './factura-list.component.html',
  styleUrls: ['./factura-list.component.css'],
})
export class FacturaListComponent implements OnInit {
  facturas: Datum[] = [];
  pagination!: Pagination;

  filtroName: string = '';
  filtroId: string = '';

  facturaSeleccionada: Facturas | null = null;
  facturaNueva: boolean = false;
  loader: boolean = true;
  constructor(private facturaService: FacturaService) {}

  ngOnInit(): void {
    this.loadFacturas(1);
  }

  loadFacturas(page: number): void {
    this.facturaService.getBills(page).subscribe({
      next: (datafacturas: Facturas) => {
        if (
          datafacturas &&
          datafacturas.data &&
          Array.isArray(datafacturas.data)
        ) {
          this.facturas = datafacturas.data;
          this.pagination = datafacturas.pagination;
        } else {
          console.warn(
            'La API no devolvió un objeto Facturas válido:',
            datafacturas
          );
        }
      },
      error: (error) => {
        this.loader = false;
        console.error('Error al obtener facturas:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar facturas',
          text: 'No se pudo conectar con el servidor. Intente nuevamente.',
        });
      },
    });
  }

  onFacturasChange(facturas: Datum[]): void {
    this.facturas = facturas;
  }

  nuevafactura(): void {
    this.facturaNueva = true;
  }

  facturasFiltradas(): Datum[] {
    if (!this.filtroId && !this.filtroName) {
      return this.facturas;
    }

    const filtroId = this.filtroId ? this.filtroId.toLowerCase() : null;
    const filtroName = this.filtroName ? this.filtroName.toLowerCase() : null;

    const facturasFiltradas = this.facturas.filter((factura) => {
      const cumpleFiltroId = filtroId
        ? factura.number.toLowerCase().includes(filtroId)
        : true;
      const cumpleFiltroName = filtroName
        ? factura.names.toLowerCase().includes(filtroName)
        : true;

      return cumpleFiltroId && cumpleFiltroName;
    });

    return facturasFiltradas;
  }

  onCancelarFormulario(): void {
    this.loadFacturas(1);
    this.facturaSeleccionada = null;
    this.facturaNueva = false;
  }

  verFactura(id: string): void {
    this.facturaService.viewFacturaPDF(id).subscribe({
      next: (pdfBlob: Blob) => {
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank');
      },
      error: (error) => {
        this.loader = false;
        console.error('Error al obtener la factura:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar la factura',
          text: 'Hubo un error. Intente nuevamente.',
        });
      },
    });
  }

  descargarPdf(numeroFactura: string): void {
    this.facturaService.viewFacturaPDF(numeroFactura).subscribe({
      next: (pdfBlob: Blob) => {
        const link = document.createElement('a');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        link.href = pdfUrl;
        link.download = `factura_${numeroFactura}.pdf`;
        link.click();
        URL.revokeObjectURL(pdfUrl); // Limpia la URL generada
      },
      error: (error) => {
        console.error('Error al descargar la factura:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al descargar factura',
          text: 'No se pudo descargar la factura. Intente nuevamente.',
        });
      },
    });
  }

  descargarXml(numeroFactura: string): void {
    this.facturaService.getXml(numeroFactura).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Factura-${numeroFactura}.xml`;
        link.click();
        window.URL.revokeObjectURL(url); // Limpia el objeto URL
      },
      error: (error) => {
        console.error('Error al descargar el XML:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al descargar el XML',
          text: 'No se pudo conectar con el servidor. Intente nuevamente.',
        });
      },
    });
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
          (factura) => factura.number !== id
        );
        Swal.fire('¡Eliminado!', 'La factura ha sido eliminada.', 'success');
      }
    });
  }
}
