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
import { Arbetsplatser, ArbetsplatserSortInput, SortEnumType } from 'graphql-client/schema';
import { Sort } from '@angular/material/sort';
import { debounceTime, lastValueFrom } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WorkplaceComponent } from './dialogs/workplace/workplace.component';
import { ChangeService } from 'src/shared/services/change/change.service';
import { MaterialModule } from 'src/shared/modules/material/material.module';

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
  private order: ArbetsplatserSortInput[] = [
    {
      arbetsplatsNamn: SortEnumType.ASC
    }
  ];
  public skip = 0;
  public take = 10;
  public arbetsplatser: Arbetsplatser[] = [];
  public totalCount = 0;
  public displayedColumns: string[] = [];

  public selection = new SelectionModel<Arbetsplatser>(false, []);
  public selectedArbetsplatsLatLng: google.maps.LatLng | null = null;

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
    private workplaceDialog: MatDialog,
    private changeService: ChangeService
  ) { }

  ngOnInit() {
    this.title = this.activatedRoute.routeConfig?.title as string;
    this.onArbetsplatserChanged();
    this.onFilterChanged();
    this.onBreakpointChanged();
    this.onHandset();
    this.search();
    this.setCurrentPosition();
  }

  ngAfterViewInit() {
    this.onPageChanged();
  }

  private onArbetsplatserChanged() {
    this.changeService.arbetsplatser$
      .pipe(untilDestroyed(this))
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
              'arbetsplatsNamn',
              'fkKunderNavigation.kundNamn',
            ];
          } else if (state.breakpoints[Breakpoints.Small]) {
            this.displayedColumns = [
              'aktiv',
              'arbetsplatsNamn',
              'fkKunderNavigation.kundNamn',
            ];
          } else if (state.breakpoints[Breakpoints.Medium] || state.breakpoints[Breakpoints.Large]) {
            this.displayedColumns = [
              'select',
              'aktiv',
              'arbetsplatsNamn',
              'fkKunderNavigation.kundNamn',
              'fkAdresserNavigation.adress1',
              'fkAdresserNavigation.ort'
            ];
          } else if (state.breakpoints[Breakpoints.XLarge]) {
            this.displayedColumns = [
              'select',
              'aktiv',
              'arbetsplatsNamn',
              'fkKunderNavigation.kundNamn',
              'fkAdresserNavigation.adress1',
              'fkAdresserNavigation.ort',
              'fkAdresserNavigation.postnr'
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
    const order: ArbetsplatserSortInput[] = [];

    switch (sort.active) {
      case 'arbetsplatsNamn':
        order.push({
          arbetsplatsNamn: sort.direction === 'asc' ? SortEnumType.ASC : SortEnumType.DESC
        });
        break;
      case 'aktiv':
        order.push({
          aktiv: sort.direction === 'asc' ? SortEnumType.ASC : SortEnumType.DESC
        });
        break;
      case 'fkKunderNavigation.kundNr':
        order.push({
          fkKunderNavigation: {
            kundNr: sort.direction === 'asc' ? SortEnumType.ASC : SortEnumType.DESC
          }
        });
        break;
      case 'fkKunderNavigation.kundNamn':
        order.push({
          fkKunderNavigation: {
            kundNamn: sort.direction === 'asc' ? SortEnumType.ASC : SortEnumType.DESC
          }
        });
        break;
      case 'fkAdresserNavigation.adress1':
        order.push({
          fkAdresserNavigation: {
            adress1: sort.direction === 'asc' ? SortEnumType.ASC : SortEnumType.DESC
          }
        });
        break;
      case 'fkAdresserNavigation.postnr':
        order.push({
          fkAdresserNavigation: {
            postnr: sort.direction === 'asc' ? SortEnumType.ASC : SortEnumType.DESC
          }
        });
        break;
      case 'fkAdresserNavigation.ort':
        order.push({
          fkAdresserNavigation: {
            ort: sort.direction === 'asc' ? SortEnumType.ASC : SortEnumType.DESC
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

    const arbetsplatserQuery = await this.graphql.client.query({
      arbetsplatser: [
        {
          order: this.order,
          where: {
            or: [
              {
                arbetsplatsNamn: {
                  contains: this.filterFormControl.value
                }
              },
              {
                fkKunderNavigation: {
                  kundNr: {
                    contains: this.filterFormControl.value
                  },
                  kundNamn: {
                    contains: this.filterFormControl.value
                  }
                }
              },
              {
                fkAdresserNavigation: {
                  adress1: {
                    contains: this.filterFormControl.value
                  },
                  postnr: {
                    contains: this.filterFormControl.value
                  },
                  ort: {
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
            pk: true,
            arbetsplatsNamn: true,
            aktiv: true,
            fkKunderNavigation: {
              pk: true,
              kundNamn: true
            },
            fkAdresserNavigation: {
              pk: true,
              adress1: true,
              postnr: true,
              ort: true,
              fkPositionerNavigation: {
                pk: true,
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

    const items = arbetsplatserQuery.data?.arbetsplatser?.items ?? new Array(this.take);
    const totalCount = arbetsplatserQuery?.data?.arbetsplatser?.totalCount ?? 0;

    if (items.length > 0) {
      this.arbetsplatser = items;
      this.totalCount = totalCount;

      if (this.arbetsplatser.length < this.take) {
        const rowsToAdd = this.take - this.arbetsplatser.length;
        const emptyRows = new Array(rowsToAdd);
        this.arbetsplatser = this.arbetsplatser.concat(emptyRows);
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

  public onSelectionChanged(arbetsplats: Arbetsplatser) {
    if (this.selection.isSelected(arbetsplats) === false) {
      this.selection.clear();
    }
    this.selection.toggle(arbetsplats);

    if (this.selection.selected.length >= 1) {
      this.mapCenter = {
        lat: arbetsplats.fkAdresserNavigation.fkPositionerNavigation?.latitude ?? 0,
        lng: arbetsplats.fkAdresserNavigation.fkPositionerNavigation?.longitude ?? 0,
      };

      this.selectedArbetsplatsLatLng = new google.maps.LatLng({
        lat: arbetsplats.fkAdresserNavigation.fkPositionerNavigation?.latitude ?? 0,
        lng: arbetsplats.fkAdresserNavigation.fkPositionerNavigation?.longitude ?? 0
      });

      if (this.mapOpened === false) {
        this.openMap(250);
      }
    } else {
      this.selectedArbetsplatsLatLng = null;

      if (this.mapOpened === true) {
        this.closeMap(250);
      }
    }
  }

  public getRowClass(arbetsplats: Arbetsplatser | undefined) {
    return arbetsplats ? 'row' : 'row-empty';
  }

  public addWorkplace() {
    this.openWorkplaceDialog();
  }

  public rowClicked(arbetsplats: Arbetsplatser | undefined) {
    if (arbetsplats === undefined) return;
    this.openWorkplaceDialog(arbetsplats.pk);
  }

  private async openWorkplaceDialog(arbetsplatsPk?: number) {
    const dialogConfig: MatDialogConfig = {
      autoFocus: true,
      disableClose: false,
      width: '1024px',
      maxWidth: '90vw',
      height: 'calc(100vh - (5vh + 5vh))',
      position: {
        top: '5vh'
      },
      data: arbetsplatsPk
    };

    const dialogResult = await lastValueFrom(this.workplaceDialog.open(WorkplaceComponent, dialogConfig).afterClosed());
  }
}
