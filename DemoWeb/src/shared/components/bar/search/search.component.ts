import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { RouteOptgroup } from 'src/shared/interfaces/route-optgroup/route-optgroup.interface';
import { RouteOption } from 'src/shared/interfaces/route-option/route-option.interface';
import { MaterialModule } from 'src/shared/modules/material/material.module';

@UntilDestroy()
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
		MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public routeOptgroups: RouteOptgroup[] = [];
  public filteredRouteOptgroups: RouteOptgroup[] = [];
  public searchFormControl = new FormControl<string>('');
  
  @ViewChild('searchInput')
  public searchInput!: ElementRef<HTMLInputElement>;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setRoutes();
    this.onSearch();
  }

  private setRoutes() {
    const excluded: string[] = [

    ];

    for (let r of this.router.config) {
      if (r.path === undefined) continue;
      if (typeof(r.title) !== 'string') continue;
      if (r.children === undefined) continue;
      if (r.children.length === 0) continue;

      for (let c of r.children) {
        if (typeof(c.title) !== 'string') continue;
        if (typeof(c.path) !== 'string') continue;
        if (excluded.includes(c.title)) continue;

        if (this.routeOptgroups.some(routeOptgroup => routeOptgroup.title === r.title) === false) {
          const routeOptgroup: RouteOptgroup = {
            path: r.path,
            title: r.title,
            routeOptions: []
          };
          this.routeOptgroups.push(routeOptgroup);
        }

        const routeOptgroup = this.routeOptgroups.find(routeOptgroup => routeOptgroup.title === r.title) as RouteOptgroup;
        const routeOption: RouteOption = {
          path: c.path,
          title: c.title
        };

        routeOptgroup.routeOptions.push(routeOption);
      }
    }

    this.filteredRouteOptgroups = [...this.routeOptgroups];
  }

  private onSearch() {
    this.searchFormControl
      .valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(
        (searchValue: string | null) => {
          if (searchValue !== null) {
            this.filter(searchValue);
          }
        }
      );
  }

  private filter(searchValue: string) {
    const filteredRouteOptgroups: RouteOptgroup[] = [];

    for (let routeOptgroup of this.routeOptgroups) {
      for (let routeOption of routeOptgroup.routeOptions) {
        if (routeOption.title.toLowerCase().includes(searchValue.toLowerCase()) === false) continue;

        if (filteredRouteOptgroups.some(filteredRouteOptgroup => filteredRouteOptgroup.title === routeOptgroup.title) === false) {
          const filteredRouteOptgroup: RouteOptgroup = {
            path: routeOptgroup.path,
            title: routeOptgroup.title,
            routeOptions: []
          };
          filteredRouteOptgroups.push(filteredRouteOptgroup);
        }

        const filteredRouteOptgroup = filteredRouteOptgroups.find(filteredRouteOptgroup => filteredRouteOptgroup.title === routeOptgroup.title) as RouteOptgroup;
        const filteredRouteOption: RouteOption = {
          path: routeOption.path,
          title: routeOption.title
        };

        filteredRouteOptgroup.routeOptions.push(filteredRouteOption);
      }
    }

    this.filteredRouteOptgroups = [...filteredRouteOptgroups];
  }

  public onAutocompleteOpened() {
    this.searchInput.nativeElement.style.borderBottomLeftRadius = '0px';
    this.searchInput.nativeElement.style.borderBottomRightRadius = '0px';
  }

  public onAutocompleteClosed() {
    this.searchInput.nativeElement.style.borderBottomLeftRadius = '4px';
    this.searchInput.nativeElement.style.borderBottomRightRadius = '4px';
  }

  public onOptionSelected(selectedOption: MatAutocompleteSelectedEvent) {
    for (let routeOptgroup of this.routeOptgroups) {
      for (let routeOption of routeOptgroup.routeOptions) {
        if (routeOption.title === selectedOption.option.value) {
          this.searchInput.nativeElement.value = '';
          this.filteredRouteOptgroups = [...this.routeOptgroups];
          this.router.navigate([routeOptgroup.path, routeOption.path]);
          break;
        }
      }
    }
  }
}
