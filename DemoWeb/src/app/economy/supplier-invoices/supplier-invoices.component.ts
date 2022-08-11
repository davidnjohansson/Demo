import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supplier-invoices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supplier-invoices.component.html',
  styleUrls: ['./supplier-invoices.component.scss']
})
export class SupplierInvoicesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
