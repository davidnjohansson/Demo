import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-containers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss']
})
export class ContainersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
