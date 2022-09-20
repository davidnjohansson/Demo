import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Customer, SortEnumType, Workplace } from 'graphql-client/schema';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { MaterialModule } from 'src/shared/modules/material/material.module';
import { GraphQLService } from 'src/shared/services/graphql/graphql.service';

@UntilDestroy()
@Component({
	selector: 'app-workplace',
	standalone: true,
	imports: [
		CommonModule,
		GoogleMapsModule,
		MaterialModule,
		ReactiveFormsModule
	],
	templateUrl: './workplace.component.html',
	styleUrls: ['./workplace.component.scss']
})
export class WorkplaceComponent implements OnInit {
	public workplace: Workplace | undefined;
	public workplaceFormGroup = new FormGroup({
		active: new FormControl(true, { nonNullable: true, validators: Validators.required }),
		workplaceName: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
		customerId: new FormControl<Customer | string>('', { nonNullable: true, validators: Validators.required }),
		address1: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
		city: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
		zipCode: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
		latitude: new FormControl<number | null>(null, { validators: Validators.required }),
		longitude: new FormControl<number | null>(null, { validators: Validators.required })
	});
	public customers: Customer[] = [];
	public mapOptions: google.maps.MapOptions = { disableDoubleClickZoom: true };
	public mapCenter: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
	public mapPosition$ = new BehaviorSubject<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });
	public submitting = false;

	constructor(
		@Inject(MAT_DIALOG_DATA) public workplaceId: number | undefined,
		private dialogRef: MatDialogRef<WorkplaceComponent>,
		private graphqlService: GraphQLService
	) { }

	async ngOnInit() {
		await this.getWorkplace();
		this.searchCustomer();
		this.onCustomerChanged();
		this.onLatitudeChanged();
		this.onLongitudeChanged();
		this.onMapPositionChanged();
		this.initMap();
	}

	private async getWorkplace() {
		if (this.workplaceId === undefined) return;

		const result = await this.graphqlService.client.query({
			workplaces: [
				{
					where: {
						id: {
							eq: this.workplaceId
						}
					}
				},
				{
					items: {
						id: true,
						active: true,
						workplaceName: true,
						customer: {
							id: true,
							customerName: true
						},
						address: {
							address1: true,
							city: true,
							zipCode: true,
							position: {
								latitude: true,
								longitude: true
							}
						}
					}
				}
			]
		});

		this.workplace = result.data?.workplaces?.items?.at(0);
		this.patchWorkplaceFormGroup();
	}

	private onCustomerChanged() {
		this.workplaceFormGroup.controls.customerId
			.valueChanges
			.pipe(untilDestroyed(this), debounceTime(50))
			.subscribe(
				(value: Customer | string) => {
					if (typeof (value) === 'string') {
						this.searchCustomer();
						return;
					}
				}
			);
	}

	private onLatitudeChanged() {
		this.workplaceFormGroup.controls.latitude
			.valueChanges
			.pipe(untilDestroyed(this), debounceTime(50))
			.subscribe(
				(latitude: number | null) => {
					if (latitude === null) return;
					if (latitude === this.mapPosition$.getValue().lat) return;
					this.mapPosition$.next({
						lat: latitude,
						lng: this.mapPosition$.getValue().lng
					});
				}
			);
	}

	private onLongitudeChanged() {
		this.workplaceFormGroup.controls.longitude
			.valueChanges
			.pipe(untilDestroyed(this), debounceTime(50))
			.subscribe(
				(longitude: number | null) => {
					if (longitude === null) return;
					if (longitude === this.mapPosition$.getValue().lng) return;
					this.mapPosition$.next({
						lat: this.mapPosition$.getValue().lat,
						lng: longitude
					});
				}
			);
	}

	private onMapPositionChanged() {
		this.mapPosition$
			.pipe(untilDestroyed(this))
			.subscribe(
				(position: google.maps.LatLngLiteral) => {
					if (position.lat === 0 && position.lng === 0) return;

					const latitude = this.workplaceFormGroup.controls.latitude.value;
					const longitude = this.workplaceFormGroup.controls.longitude.value;

					if (latitude !== null && latitude !== position.lat) {
						this.workplaceFormGroup.controls.latitude.patchValue(position.lat);
						this.workplaceFormGroup.markAsDirty();
					}

					if (longitude !== null && longitude !== position.lng) {
						this.workplaceFormGroup.controls.longitude.patchValue(position.lng);
						this.workplaceFormGroup.markAsDirty();
					}
				}
			);
	}

	private async searchCustomer() {
		const filter = this.workplaceFormGroup.controls.customerId.value as string;
		if (typeof (filter) !== 'string') return;

		const customersQuery = await this.graphqlService.client.query({
			customers: [
				{
					where: {
						customerName: {
							contains: filter
						}
					},
					order: [
						{
							customerName: SortEnumType.ASC
						}
					],
					skip: 0,
					take: 10
				},
				{
					items: {
						id: true,
						customerName: true
					}
				}
			]
		});

		this.customers = customersQuery.data?.customers?.items ?? [];
	}

	private patchWorkplaceFormGroup() {
		this.workplaceFormGroup.patchValue({
			active: this.workplace?.active ?? true,
			workplaceName: this.workplace?.workplaceName ?? '',
			customerId: this.workplace?.customer ?? '',
			address1: this.workplace?.address.address1 ?? '',
			city: this.workplace?.address.city ?? '',
			zipCode: this.workplace?.address.zipCode ?? '',
			latitude: this.workplace?.address.position?.latitude ?? null,
			longitude: this.workplace?.address.position?.longitude ?? null
		});
	}

	private initMap() {
		const hasPosition =
			this.workplace?.address?.position?.latitude !== undefined &&
			this.workplace?.address?.position?.longitude !== undefined;

		if (hasPosition) {
			this.mapCenter = {
				lat: this.workplace?.address?.position?.latitude!,
				lng: this.workplace?.address?.position?.longitude!
			};

			this.mapPosition$.next({
				lat: this.workplace?.address?.position?.latitude!,
				lng: this.workplace?.address?.position?.longitude!
			});
		} else {
			navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
				this.mapCenter = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};

				this.mapPosition$.next({
					lat: position.coords.latitude,
					lng: position.coords.longitude
				});
			});
		}
	}

	public onMapDblclick(event: google.maps.MapMouseEvent) {
		this.mapPosition$.next({
			lat: event.latLng?.lat()!,
			lng: event.latLng?.lng()!
		});

		this.workplaceFormGroup.patchValue({
			latitude: event.latLng?.lat()!,
			longitude: event.latLng?.lng()!
		});
	}

	public getCustomerText(customer: Customer | null) {
		return customer === null ? '' : customer.customerName;
	}

	public async save(closeAfterSave?: boolean) {
		this.submitting = true;

		const { active, workplaceName, customerId, address1, city, zipCode, latitude, longitude } = this.workplaceFormGroup.controls;

		const result = await this.graphqlService.client.mutation({
			upsertWorkplace: [
				{
					input: {
						id: this.workplaceId,
						active: active.value,
						workplaceName: workplaceName.value,
						customerId: (customerId.value as Customer).id,
						upsertAddressInput: {
							address1: address1.value,
							city: city.value,
							zipCode: zipCode.value,
							upsertPositionInput: {
								latitude: latitude.value,
								longitude: longitude.value
							}
						}
					}
				},
				{
					id: true,
					validationErrors: {
						message: true,
						typeName: true,
						propertyName: true
					}
				}
			]
		});

		this.graphqlService.validate(result.data, this.workplaceFormGroup);

		if (result.data?.upsertWorkplace.id) {
			this.workplaceId = result.data.upsertWorkplace.id;
			this.getWorkplace();
			this.workplaceFormGroup.markAsPristine();
			if (closeAfterSave === true) {
				this.dialogRef.close();
			}
		}

		this.submitting = false;
	}

	public cancel() {
		this.dialogRef.close();
	}
}
