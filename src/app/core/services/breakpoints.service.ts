import { inject, Injectable } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { concatMap, filter, from, map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BreakPointsService {

  private readonly _observer = inject(BreakpointObserver);

  private readonly _breakpoints: Array<string> = [
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
  ];

  private readonly _displayMaps = new Map<string, keyof typeof Breakpoints>([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ])

  private observer$ !: Observable<keyof typeof Breakpoints>;

  constructor() {
    this.initBreakpointsObserver();
  }

  get observer() {
    return toSignal(this.observer$, { initialValue: null });
  }

  private initBreakpointsObserver() {
    this.observer$ = this._observer.observe([...this._breakpoints])
      .pipe(
        takeUntilDestroyed(),
        concatMap(({ breakpoints }) => 
          from(Object.keys(breakpoints)).pipe(
            map(key => breakpoints[key] ? this._displayMaps.get(key) : null),
          )
        ),
        filter(Boolean)
      );
  }
}