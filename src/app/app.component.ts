import { CanActivate, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthGuard } from './core/authGuard';
import { AuthService } from './core/auth.service';
import { take } from 'rxjs';
import { ScreenService } from './shared/services/screen.service';

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
    media: MediaMatcher,
    private router: Router
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
    this.canActivate
      .getAuthState()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.isLogged = !!res;
        },
        error: (erro) => {},
      });
  }

  teste() {
    this.canActivate.logout();
    this.isLogged = false;
    this.router.navigate(['/login']);
  }
}
