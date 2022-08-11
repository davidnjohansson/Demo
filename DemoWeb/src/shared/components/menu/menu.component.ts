import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterModule } from '@angular/router';
import { BreakpointService } from 'src/shared/services/breakpoint/breakpoint.service';
import { DrawerService } from 'src/shared/services/drawer/drawer.service';
import { MaterialModule } from 'src/shared/modules/material/material.module';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
		MaterialModule,
    RouterModule
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public routes: Route[] = [];

  constructor(
    private router: Router,
    private breakpointService: BreakpointService,
    private drawerService: DrawerService) { }

  ngOnInit() {
    for (let route of this.router.config) {
      if (route.children === undefined || route.children.length === 0) continue;
      this.routes.push(route);
    }
  }

  public navigate(route: Route) {
    if (this.breakpointService.Handset$.getValue()) {
      this.drawerService.drawer.close();
    }

    this.router.navigate([route.path]);
  }
}
