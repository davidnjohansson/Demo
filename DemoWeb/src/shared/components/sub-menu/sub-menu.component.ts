import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/shared/modules/material/material.module';

@Component({
  selector: 'app-sub-menu',
  standalone: true,
  imports: [
    CommonModule,
		MaterialModule,
    RouterModule
  ],
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent implements OnInit {
  public routes: Routes | undefined;
  public title: string | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    for (let route of this.router.config) {
      if (route.path !== this.activatedRoute.parent?.routeConfig?.path) continue;
      if (route.children === undefined) continue;
      this.routes = route.children.filter(route => route.component?.name !== SubMenuComponent.name);
      this.title = typeof(route.title) === 'string' ? route.title : 'Missing title';
    }
  }
}
