import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FacturaService } from '../../services/factura.service';
import { Datum, Facturas } from '../../interfaces/facturas.interfaces';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.css'],
})
export class TablePaginationComponent implements OnInit {
  @Output() facturasChange = new EventEmitter<Datum[]>();
  //pagination: { links: { url: string | null; page: number }[] } = { links: [] };
  pagination: any = {};

  constructor(private facturaService: FacturaService) {}

  ngOnInit(): void {
    this.loadPage(1);
  }

  loadPage(page: number): void {
    this.facturaService.getBills(page).subscribe((response: Facturas) => {
      this.pagination = response.pagination || [];
      this.facturasChange.emit(response.data);
    });
  }

  changePage(page: number | null): void {
    if (page) {
      this.loadPage(page);
    }
  }
}
