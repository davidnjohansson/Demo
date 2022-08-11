import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { BarComponent } from 'src/shared/components/bar/bar.component';
import { MatDrawer } from '@angular/material/sidenav';
import { DrawerService } from 'src/shared/services/drawer/drawer.service';
import { MenuComponent } from 'src/shared/components/menu/menu.component';
import { BreakpointService } from 'src/shared/services/breakpoint/breakpoint.service';
import { MaterialModule } from 'src/shared/modules/material/material.module';
import { SubscriptionService } from 'src/shared/services/subscription/subscription.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
		MaterialModule,
    RouterModule,
    BarComponent,
    MenuComponent
  ]
})
export class AppComponent implements OnInit, AfterViewChecked {
  @ViewChild(MatDrawer)
  public drawer: MatDrawer | undefined;

  constructor(
    public authService: AuthService,
    public breakpointService: BreakpointService,
    private router: Router,
    private drawerService: DrawerService,
		private subscriptionService: SubscriptionService
  ) { }

  ngOnInit() {
    this.evalAuth();
		this.subscriptionService.init();
  }

  private evalAuth() {
    const isAuth = localStorage.getItem('isAuth');

    if (isAuth !== null) {
      this.authService.isAuth.next(true);
    } else {
      this.authService.isAuth.next(false);
      this.router.navigate(['login']);
    }
  }

  ngAfterViewChecked(): void {
    this.drawerService.drawer = this.drawer!;
  }
}
