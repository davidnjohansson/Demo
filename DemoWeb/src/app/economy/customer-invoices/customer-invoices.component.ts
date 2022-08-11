import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-invoices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-invoices.component.html',
  styleUrls: ['./customer-invoices.component.scss']
})
export class CustomerInvoicesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
