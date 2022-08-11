import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointService } from 'src/shared/services/breakpoint/breakpoint.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    CommonModule,
    GoogleMapsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule
  ],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild(MatDrawer)
  public drawer!: MatDrawer;

  public mapOptions: google.maps.MapOptions = {
    fullscreenControl: false,
    zoomControl: false
  };

  constructor(
    public breakpointService: BreakpointService
  ) { }

  ngOnInit(): void {

  }

  public openDrawer() {
    this.drawer.open();
  }

  public closeDrawer() {
    this.drawer.close();
  }
}
