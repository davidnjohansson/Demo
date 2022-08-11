import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-customer-invoices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-customer-invoices.component.html',
  styleUrls: ['./create-customer-invoices.component.scss']
})
export class CreateCustomerInvoicesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
