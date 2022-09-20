import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BreakpointService } from 'src/shared/services/breakpoint/breakpoint.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { GraphQLService } from 'src/shared/services/graphql/graphql.service';
import { SortEnumType, Workplace, WorkplaceSortInput } from 'graphql-client/schema';
import { Sort } from '@angular/material/sort';
import { debounceTime, lastValueFrom } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WorkplaceComponent } from './dialogs/workplace/workplace.component';
import { MaterialModule } from 'src/shared/modules/material/material.module';
import { SubscriptionService } from 'src/shared/services/subscription/subscription.service';

@UntilDestroy()
@Component({
	selector: 'app-workplaces',
	standalone: true,
	imports: [
		CommonModule,
		GoogleMapsModule,
		MaterialModule,
		ReactiveFormsModule
	],
	templateUrl: './workplaces.component.html',
	styleUrls: ['./workplaces.component.scss']
})
export class WorkplacesComponent implements OnInit, AfterViewInit {
	public title: string | undefined;
	public filterFormControl = new FormControl<string>('', { nonNullable: true });

	public searching = false;
	private order: WorkplaceSortInput[] = [
		{
			workplaceName: SortEnumType.ASC
		}
	];
	public skip = 0;
	public take = 10;
	public workplaces: Workplace[] = [];
	public totalCount = 0;
	public displayedColumns: string[] = [];

	public selection = new SelectionModel<Workplace>(false, []);
	public selectedWorkplaceLatLng: google.maps.LatLng | null = null;

	public mapOpened = false;
	public mapCenter: google.maps.LatLngLiteral = {
		lat: 0,
		lng: 0
	};

	@ViewChild(MatPaginator)
	public paginator: MatPaginator | undefined;

	constructor(
		private activatedRoute: ActivatedRoute,
		public breakpoint: BreakpointService,
		private breakpointObserver: BreakpointObserver,
		private graphql: GraphQLService,
		private subscriptionService: SubscriptionService,
		private workplaceDialog: MatDialog
	) { }

	ngOnInit() {
		this.title = this.activatedRoute.routeConfig?.title as string;
		this.onWorkplaceInserted();
		this.onWorkplaceUpdated();
		this.onFilterChanged();
		this.onBreakpointChanged();
		this.onHandset();
		this.search();
		this.setCurrentPosition();
	}

	ngAfterViewInit() {
		this.onPageChanged();
	}

	private onWorkplaceInserted() {
		this.subscriptionService.workplaceInserted$
			.pipe(untilDestroyed(this), debounceTime(50))
			.subscribe(() => this.search());
	}

	private onWorkplaceUpdated() {
		this.subscriptionService.workplaceUpdated$
			.pipe(untilDestroyed(this), debounceTime(50))
			.subscribe(() => this.search());
	}

	private onFilterChanged() {
		this.filterFormControl
			.valueChanges
			.pipe(untilDestroyed(this), debounceTime(125))
			.subscribe(() => {
				this.paginator?.firstPage();
				this.search();
			});
	}

	private onBreakpointChanged() {
		this.breakpointObserver
			.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
			.pipe(untilDestroyed(this))
			.subscribe(
				(state: BreakpointState) => {
					if (state.breakpoints[Breakpoints.XSmall]) {
						this.displayedColumns = [
							'workplaceName',
							'customer.customerName',
						];
					} else if (state.breakpoints[Breakpoints.Small]) {
						this.displayedColumns = [
							'active',
							'workplaceName',
							'customer.customerName',
						];
					} else if (state.breakpoints[Breakpoints.Medium] || state.breakpoints[Breakpoints.Large]) {
						this.displayedColumns = [
							'select',
							'active',
							'workplaceName',
							'customer.customerName',
							'address.address1',
							'address.city'
						];
					} else if (state.breakpoints[Breakpoints.XLarge]) {
						this.displayedColumns = [
							'select',
							'active',
							'workplaceName',
							'customer.customerName',
							'address.address1',
							'address.city',
							'address.zipCode'
						];
					}
				}
			);
	}

	private onHandset() {
		this.breakpoint.Handset$
			.pipe(untilDestroyed(this))
			.subscribe(
				(isHandset: boolean) => {
					// Close map if we go from desktop to handset and map is opened.
					if (isHandset === true && this.mapOpened === true) {
						this.closeMap(0);
						// Open map if we go from handset to desktop and map is closed and an arbetsplats is selected.
					} else if (isHandset === false && this.mapOpened === false && this.selection.selected.length >= 1) {
						this.openMap(0);
					}
				}
			);
	}

	public onSortChanged(sort: Sort) {
		const order: WorkplaceSortInput[] = [];

		switch (sort.active) {
			case 'workplaceName':
				order.push({
					workplaceName: sort.direction === 'asc' ? SortEnumType.ASC : SortEnumType.DESC
				});
				break;
			case 'active':
				order.push({
					active: sort.direction === 'asc' ? SortEnumType.ASC : SortEnumType.DESC
				});
				break;
			case 'customer.customerNo':
				order.push({
					customer: {
						customerNo: sort.direction === 'asc' ? SortEnumType.ASC : SortEnumType.DESC
					}
				});
				break;
			case 'customer.customerName':
				order.push({
					customer: {
						customerName: sort.direction === 'asc' ? SortEnumType.ASC : SortEnumType.DESC
					}
				});
				break;
			case 'address.address1':
				order.push({
					address: {
						address1: sort.direction === 'asc' ? SortEnumType.ASC : SortEnumType.DESC
					}
				});
				break;
			case 'address.zipCode':
				order.push({
					address: {
						zipCode: sort.direction === 'asc' ? SortEnumType.ASC : SortEnumType.DESC
					}
				});
				break;
			case 'address.city':
				order.push({
					address: {
						city: sort.direction === 'asc' ? SortEnumType.ASC : SortEnumType.DESC
					}
				});
				break;
		}

		this.order = order;
		this.search();
	}

	private onPageChanged() {
		this.paginator!.page
			.pipe(untilDestroyed(this))
			.subscribe(
				(pageEvent: PageEvent) => {
					this.skip = pageEvent.pageIndex * pageEvent.pageSize;
					this.search();
				}
			);
	}

	private async search() {
		this.searching = true;

		const workplaceQuery = await this.graphql.client.query({
			workplaces: [
				{
					order: this.order,
					where: {
						or: [
							{
								workplaceName: {
									contains: this.filterFormControl.value
								}
							},
							{
								customer: {
									customerNo: {
										contains: this.filterFormControl.value
									},
									customerName: {
										contains: this.filterFormControl.value
									}
								}
							},
							{
								address: {
									address1: {
										contains: this.filterFormControl.value
									},
									zipCode: {
										contains: this.filterFormControl.value
									},
									city: {
										contains: this.filterFormControl.value
									}
								}
							}
						]
					},
					skip: this.skip,
					take: this.take
				},
				{
					items: {
						id: true,
						workplaceName: true,
						active: true,
						customer: {
							id: true,
							customerName: true
						},
						address: {
							id: true,
							address1: true,
							zipCode: true,
							city: true,
							position: {
								id: true,
								latitude: true,
								longitude: true
							}
						}
					},
					pageInfo: {
						hasPreviousPage: true,
						hasNextPage: true
					},
					totalCount: true
				}
			]
		});

		const items = workplaceQuery.data?.workplaces?.items ?? new Array(this.take);
		const totalCount = workplaceQuery?.data?.workplaces?.totalCount ?? 0;

		if (items.length > 0) {
			this.workplaces = items;
			this.totalCount = totalCount;

			if (this.workplaces.length < this.take) {
				const rowsToAdd = this.take - this.workplaces.length;
				const emptyRows = new Array(rowsToAdd);
				this.workplaces = this.workplaces.concat(emptyRows);
			}
		}

		this.searching = false;
	}

	private setCurrentPosition() {
		navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
			this.mapCenter = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
		});
	}

	private openMap(duration: number) {
		const left = document.getElementById('workplaces-left-id') as HTMLElement;
		const right = document.getElementById('workplaces-right-id') as HTMLElement;

		left.animate([
			{
				width: '75%'
			}
		], {
			duration: duration,
			fill: 'forwards'
		});

		right.animate([
			{
				transform: 'translateX(-100%)'
			}
		], {
			duration: duration,
			fill: 'forwards'
		});

		this.mapOpened = !this.mapOpened;
	}

	private closeMap(duration: number) {
		const left = document.getElementById('workplaces-left-id') as HTMLElement;
		const right = document.getElementById('workplaces-right-id') as HTMLElement;

		left.animate([
			{
				width: '100%'
			}
		], {
			duration: duration,
			fill: 'forwards'
		});

		right.animate([
			{
				transform: 'translateX(0%)'
			}
		], {
			duration: duration,
			fill: 'forwards'
		});

		this.mapOpened = !this.mapOpened;
	}

	public onSelectionChanged(workplace: Workplace) {
		if (this.selection.isSelected(workplace) === false) {
			this.selection.clear();
		}
		this.selection.toggle(workplace);

		if (this.selection.selected.length >= 1) {
			this.mapCenter = {
				lat: workplace.address.position?.latitude ?? 0,
				lng: workplace.address.position?.longitude ?? 0,
			};

			this.selectedWorkplaceLatLng = new google.maps.LatLng({
				lat: workplace.address.position?.latitude ?? 0,
				lng: workplace.address.position?.longitude ?? 0
			});

			if (this.mapOpened === false) {
				this.openMap(250);
			}
		} else {
			this.selectedWorkplaceLatLng = null;

			if (this.mapOpened === true) {
				this.closeMap(250);
			}
		}
	}

	public getRowClass(workplace: Workplace | undefined) {
		return workplace ? 'row' : 'row-empty';
	}

	public addWorkplace() {
		this.openWorkplaceDialog();
	}

	public rowClicked(workplace: Workplace | undefined) {
		if (workplace === undefined) return;
		this.openWorkplaceDialog(workplace.id);
	}

	private async openWorkplaceDialog(workplaceId?: number) {
		const dialogConfig: MatDialogConfig = {
			autoFocus: true,
			disableClose: false,
			width: '1024px',
			maxWidth: '90vw',
			height: 'calc(100vh - (5vh + 5vh))',
			position: {
				top: '5vh'
			},
			data: workplaceId
		};

		const dialogResult = await lastValueFrom(this.workplaceDialog.open(WorkplaceComponent, dialogConfig).afterClosed());
	}
}
