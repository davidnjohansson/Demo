import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transport-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transport-overview.component.html',
  styleUrls: ['./transport-overview.component.scss']
})
export class TransportOverviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
