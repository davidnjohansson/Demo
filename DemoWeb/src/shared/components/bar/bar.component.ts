import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerService } from 'src/shared/services/drawer/drawer.service';
import { MatMenu } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { BreakpointService } from 'src/shared/services/breakpoint/breakpoint.service';
import { MaterialModule } from 'src/shared/modules/material/material.module';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [
    CommonModule,
		MaterialModule,
    RouterModule,
    SearchComponent
  ],
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent {
  @ViewChild(MatMenu) 
  public barMenu: MatMenu | undefined;

  constructor(
    private drawerService: DrawerService,
    public breakpointService: BreakpointService
  ) { }

  public toggleDrawer() {
    this.drawerService.drawer.opened ? this.drawerService.drawer.close() : this.drawerService.drawer.open();
  }

  public onBarMenuOpened() {
    const el = document.getElementById(this.barMenu!.panelId);
    el!.style.left = '-16px';
  }

  public logout() {
    localStorage.removeItem('isAuth');
    location.reload();
  }
}
