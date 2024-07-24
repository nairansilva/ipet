import { CanActivate } from '@angular/router';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthGuard } from './core/authGuard';
import { AuthService } from './core/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  isSidenavOpen = true;
  isLogged = false;

  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  constructor(
    private canActivate: AuthService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.canActivate.user$.subscribe((user) => {
      this.isLogged = !!user;
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  ngOnInit() {
    console.log('Entrei aqui');
    this.canActivate
      .getAuthState()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          console.log('sucesso', res);
          this.isLogged = !!res;
        },
        error: (erro) => {
          console.log('erro', erro);
        },
      });
  }
  teste() {
    console.log('Entrei');
    this.canActivate.logout();
    this.isLogged = false;
  }
}
