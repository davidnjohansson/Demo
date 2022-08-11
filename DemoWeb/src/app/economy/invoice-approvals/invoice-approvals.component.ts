import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-approvals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-approvals.component.html',
  styleUrls: ['./invoice-approvals.component.scss']
})
export class InvoiceApprovalsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
