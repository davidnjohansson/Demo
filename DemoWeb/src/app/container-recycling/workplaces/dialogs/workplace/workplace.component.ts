import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Arbetsplatser, Kunder, SortEnumType } from 'graphql-client/schema';
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
	public arbetsplats: Arbetsplatser | undefined;
	public arbetsplatsFormGroup = new FormGroup({
		aktiv: new FormControl(true, { nonNullable: true, validators: Validators.required }),
		arbetsplatsNamn: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
		fkKunder: new FormControl<Kunder | string>('', { nonNullable: true, validators: Validators.required }),
		adress1: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
		ort: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
		postnr: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
		latitude: new FormControl<number | null>(null, { validators: Validators.required }),
		longitude: new FormControl<number | null>(null, { validators: Validators.required })
	});
	public kunder: Kunder[] = [];
	public mapOptions: google.maps.MapOptions = { disableDoubleClickZoom: true };
	public mapCenter: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
	public mapPosition$ = new BehaviorSubject<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });
	public submitting = false;

	constructor(
		@Inject(MAT_DIALOG_DATA) public arbetsplatsPk: number | undefined,
		private dialogRef: MatDialogRef<WorkplaceComponent>,
		private graphqlService: GraphQLService
	) { }

	ngOnInit() {
		this.getArbetsplats();
		this.onSearchKundNamn();
		this.onLatitudeChanged();
		this.onLongitudeChanged();
		this.onMapPositionChanged();
		this.initMap();
	}

	private async getArbetsplats() {
		if (this.arbetsplatsPk === undefined) return;

		const result = await this.graphqlService.client.query({
			arbetsplatser: [
				{
					where: {
						pk: {
							eq: this.arbetsplatsPk
						}
					}
				},
				{
					items: {
						pk: true,
						aktiv: true,
						arbetsplatsNamn: true,
						fkKunderNavigation: {
							pk: true,
							kundNamn: true
						},
						fkAdresserNavigation: {
							adress1: true,
							ort: true,
							postnr: true,
							fkPositionerNavigation: {
								latitude: true,
								longitude: true
							}
						}
					}
				}
			]
		});

		this.arbetsplats = result.data?.arbetsplatser?.items?.at(0);
		this.patchArbetsplatsFormGroup();
	}

	private onSearchKundNamn() {
		this.arbetsplatsFormGroup.controls.fkKunder
			.valueChanges
			.pipe(untilDestroyed(this), debounceTime(50))
			.subscribe(
				(value: Kunder | string) => {
					if (typeof (value) === 'string') {
						this.searchKunder();
						return;
					}
				}
			);
	}

	private onLatitudeChanged() {
		this.arbetsplatsFormGroup.controls.latitude
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
		this.arbetsplatsFormGroup.controls.longitude
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
					const latitude = this.arbetsplatsFormGroup.controls.latitude.value;
					const longitude = this.arbetsplatsFormGroup.controls.longitude.value;

					if (latitude !== null && latitude !== position.lat) {
						this.arbetsplatsFormGroup.controls.latitude.patchValue(position.lat);
					}

					if (longitude !== null && longitude !== position.lng) {
						this.arbetsplatsFormGroup.controls.longitude.patchValue(position.lng);
					}
				}
			);
	}

	private async searchKunder() {
		const filter = this.arbetsplatsFormGroup.controls.fkKunder.value as string;

		const kunderQuery = await this.graphqlService.client.query({
			kunder: [
				{
					where: {
						kundNamn: {
							contains: filter
						}
					},
					order: [
						{
							kundNamn: SortEnumType.ASC
						}
					],
					skip: 0,
					take: 10
				},
				{
					items: {
						pk: 1,
						kundNamn: 1
					}
				}
			]
		});

		this.kunder = kunderQuery.data?.kunder?.items ?? [];
	}

	private patchArbetsplatsFormGroup() {
		this.arbetsplatsFormGroup.patchValue({
			aktiv: this.arbetsplats?.aktiv ?? true,
			arbetsplatsNamn: this.arbetsplats?.arbetsplatsNamn ?? '',
			fkKunder: this.arbetsplats?.fkKunderNavigation ?? '',
			adress1: this.arbetsplats?.fkAdresserNavigation.adress1 ?? '',
			ort: this.arbetsplats?.fkAdresserNavigation.ort ?? '',
			postnr: this.arbetsplats?.fkAdresserNavigation.postnr ?? '',
			latitude: this.arbetsplats?.fkAdresserNavigation.fkPositionerNavigation?.latitude ?? null,
			longitude: this.arbetsplats?.fkAdresserNavigation.fkPositionerNavigation?.longitude ?? null
		});
	}

	private initMap() {
		const hasPosition =
			this.arbetsplats?.fkAdresserNavigation?.fkPositionerNavigation?.latitude !== undefined &&
			this.arbetsplats?.fkAdresserNavigation?.fkPositionerNavigation?.longitude !== undefined;

		if (hasPosition) {
			this.mapCenter = {
				lat: this.arbetsplats?.fkAdresserNavigation?.fkPositionerNavigation?.latitude!,
				lng: this.arbetsplats?.fkAdresserNavigation?.fkPositionerNavigation?.longitude!
			};

			this.mapPosition$.next({
				lat: this.arbetsplats?.fkAdresserNavigation?.fkPositionerNavigation?.latitude!,
				lng: this.arbetsplats?.fkAdresserNavigation?.fkPositionerNavigation?.longitude!
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

		this.arbetsplatsFormGroup.patchValue({
			latitude: event.latLng?.lat()!,
			longitude: event.latLng?.lng()!
		});
	}

	public getKunderText(kund: Kunder | null) {
		return kund === null ? '' : kund.kundNamn;
	}

	public async save(closeAfterSave?: boolean) {
		this.submitting = true;

		const { aktiv, arbetsplatsNamn, fkKunder, adress1, ort, postnr, latitude, longitude } = this.arbetsplatsFormGroup.controls;

		const result = await this.graphqlService.client.mutation({
			upsertArbetsplats: [
				{
					input: {
						pk: this.arbetsplats?.pk,
						aktiv: aktiv.value,
						arbetsplatsNamn: arbetsplatsNamn.value,
						fkKunder: (fkKunder.value as Kunder).pk,
						adress1: adress1.value,
						ort: ort.value,
						postnr: postnr.value,
						latitude: latitude.value,
						longitude: longitude.value
					}
				},
				{
					pk: true,
					validationErrors: {
						message: true,
						property: true
					}
				}
			]
		});

		this.graphqlService.validate(result.data, this.arbetsplatsFormGroup);

		if (this.arbetsplatsFormGroup.valid) {
			this.arbetsplatsFormGroup.markAsPristine();
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
