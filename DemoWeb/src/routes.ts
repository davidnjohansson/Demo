import { Routes } from '@angular/router';
import { SubMenuComponent } from './shared/components/sub-menu/sub-menu.component';
import { AuthGuard } from './shared/guards/auth/auth.guard';

export const routes: Routes = [
	{
		path: '',
		title: 'Start',
		loadComponent: () => import('./app/start/start.component').then((c) => c.StartComponent),
		canActivate: [AuthGuard]
	},
	{
		path: 'login',
		title: 'Login',
		loadComponent: () => import('./app/login/login.component').then((c) => c.LoginComponent)
	},
	{
		path: 'settings',
		title: 'Inställningar',
		loadComponent: () => import('./app/settings/settings.component').then((c) => c.SettingsComponent),
		canActivate: [AuthGuard]
	},
	{
		path: 'order-management',
		title: 'Orderhantering',
		children: [
			{
				path: '',
				component: SubMenuComponent,
				canActivate: [AuthGuard]
			},
			{
				path: 'map',
				title: 'Kartplanering',
				loadComponent: () => import('./app/order-management/map/map.component').then((c) => c.MapComponent),
				canActivate: [AuthGuard],
				data: {
					icon: 'public'
				}
			},
			{
				path: 'order-overview',
				title: 'Orderöversikt',
				loadComponent: () => import('./app/order-management/order-overview/order-overview.component').then((c) => c.OrderOverviewComponent),
				canActivate: [AuthGuard],
				data: {
					icon: 'list_alt'
				}
			},
			{
				path: 'transport-overview',
				title: 'Transportöversikt',
				loadComponent: () => import('./app/order-management/transport-overview/transport-overview.component').then((c) => c.TransportOverviewComponent),
				canActivate: [AuthGuard],
				data: {
					icon: 'local_shipping'
				}
			},
		]
	},
	{
		path: 'container-recycling',
		title: 'Container / Återvinning',
		children: [
			{
				path: '',
				component: SubMenuComponent,
				canActivate: [AuthGuard]
			},
			{
				path: 'workplaces',
				title: 'Arbetsplatser',
				loadComponent: () => import('./app/container-recycling/workplaces/workplaces.component').then((c) => c.WorkplacesComponent),
				canActivate: [AuthGuard],
				data: {
					icon: 'home_work'
				}
			},
			{
				path: 'containers',
				title: 'Behållare',
				loadComponent: () => import('./app/container-recycling/containers/containers.component').then((c) => c.ContainersComponent),
				canActivate: [AuthGuard],
				data: {
					icon: 'takeout_dining'
				}
			},
			{
				path: 'services',
				title: 'Tjänster',
				loadComponent: () => import('./app/container-recycling/services/services.component').then((c) => c.ServicesComponent),
				canActivate: [AuthGuard],
				data: {
					icon: 'rv_hookup'
				}
			}
		]
	},
	{
		path: 'economy',
		title: 'Ekonomi',
		children: [
			{
				path: '',
				component: SubMenuComponent,
				canActivate: [AuthGuard]
			},
			{
				path: 'customer-invoices',
				title: 'Kundfakturor',
				loadComponent: () => import('./app/economy/customer-invoices/customer-invoices.component').then((c) => c.CustomerInvoicesComponent),
				canActivate: [AuthGuard],
				data: {
					icon: 'receipt'
				}
			},
			{
				path: 'create-customer-invoices',
				title: 'Skapa kundfakturor',
				loadComponent: () => import('./app/economy/create-customer-invoices/create-customer-invoices.component').then((c) => c.CreateCustomerInvoicesComponent),
				canActivate: [AuthGuard],
				data: {
					icon: 'factory'
				}
			},
			{
				path: 'invoice-approvals',
				title: 'Attestflöden',
				loadComponent: () => import('./app/economy/invoice-approvals/invoice-approvals.component').then((c) => c.InvoiceApprovalsComponent),
				canActivate: [AuthGuard],
				data: {
					icon: 'fact_check'
				}
			},
			{
				path: 'supplier-invoices',
				title: 'Leverantörsfakturor',
				loadComponent: () => import('./app/economy/supplier-invoices/supplier-invoices.component').then((c) => c.SupplierInvoicesComponent),
				canActivate: [AuthGuard],
				data: {
					icon: 'book'
				}
			}
		]
	}
];
