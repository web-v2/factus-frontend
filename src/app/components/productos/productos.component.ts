import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto.interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];

  filtroName: string = '';
  filtroId: number = 0;

  productoSeleccionado: Producto | null = null;
  productoNuevo: boolean = false;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (dataProductos) => {
        if (dataProductos && Array.isArray(dataProductos)) {
          this.productos = dataProductos;
        } else {
          console.warn('La API no devolvió un arreglo válido:', dataProductos);
        }
      },
      error: (error) => {
        console.error('Error al obtener productos:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar productos',
          text: 'No se pudo conectar con el servidor. Intente nuevamente.',
        });
      },
    });
  }

  nuevoProducto(): void {
    this.productoNuevo = true;
  }

  productosFiltrados(): Producto[] {
    if (!this.filtroId && !this.filtroName) {
      return this.productos;
    }

    return this.productos.filter((producto) => {
      const cumpleFiltroId = this.filtroId
        ? producto.code_reference.toString().includes(this.filtroId.toString())
        : true;
      const cumpleFiltroName = this.filtroName
        ? producto.name.toLowerCase().includes(this.filtroName.toLowerCase())
        : true;

      return cumpleFiltroId && cumpleFiltroName;
    });
  }

  editarProduto(producto: Producto): void {
    Swal.fire(
      'Editar producto',
      `Producto seleccionado: ${producto.name}`
    ).then((result) => {
      if (result.isConfirmed) {
        this.productoSeleccionado = { ...producto };
      }
    });
  }

  onCancelarFormulario(): void {
    this.productoSeleccionado = null;
    this.productoNuevo = false;
  }

  eliminarProducto(id: string): void {
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
        this.productos = this.productos.filter(
          (producto) => producto.code_reference !== id
        );
        Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.', 'success');
      }
    });
  }
}
