import { Injectable } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  private isHandsetSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  isHandset$: Observable<boolean> = this.isHandsetSubject.asObservable();

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(map((result: BreakpointState) => result.matches))
      .subscribe((isHandset) => {
        this.isHandsetSubject.next(isHandset);
      });

    // Verificar estado inicial
    const initialState = this.breakpointObserver.isMatched(Breakpoints.Handset);
    this.isHandsetSubject.next(initialState);
  }
}
