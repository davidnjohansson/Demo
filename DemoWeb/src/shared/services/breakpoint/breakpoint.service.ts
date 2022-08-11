import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BreakpointService {
    public XSmall$ = new BehaviorSubject(false);
    public Small$ = new BehaviorSubject(false);
    public Medium$ = new BehaviorSubject(false);
    public Large$ = new BehaviorSubject(false);
    public XLarge$ = new BehaviorSubject(false);
    public Handset$ = new BehaviorSubject(false);

    constructor(private breakpointObserver: BreakpointObserver) {
        this.breakpointObserver
            .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
            .subscribe(
                (state: BreakpointState) => {
                    if (state.breakpoints[Breakpoints.XSmall]) {
                        this.XSmall$.next(true);
                    } else {
                        this.XSmall$.next(false);
                    }

                    if (state.breakpoints[Breakpoints.Small]) {
                        this.Small$.next(true);
                    } else {
                        this.Small$.next(false);
                    }

                    if (state.breakpoints[Breakpoints.Medium]) {
                        this.Medium$.next(true);
                    } else {
                        this.Medium$.next(false);
                    }

                    if (state.breakpoints[Breakpoints.Large]) {
                        this.Large$.next(true);
                    } else {
                        this.Large$.next(false);
                    }

                    if (state.breakpoints[Breakpoints.XLarge]) {
                        this.XLarge$.next(true);
                    } else {
                        this.XLarge$.next(false);
                    }

                    if (state.breakpoints[Breakpoints.XSmall] || state.breakpoints[Breakpoints.Small]) {
                        this.Handset$.next(true);
                    } else {
                        this.Handset$.next(false);
                    }
                }
            );
    }
}