import { GenericsService } from './../../shared/services/generics.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ScreenService } from '../../shared/services/screen.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isMobile = false;
  constructor(
    private genericsService: GenericsService,
    private screenService: ScreenService
  ) {
    this.screenService.isHandset$.subscribe((isHandset) => {
      this.isMobile = isHandset;
    });
  }
  weekDay = this.genericsService.getWeekDayString();
  dateToday = this.weekDay + ' - ' + new Date().toLocaleDateString();
  filterHome = { field: this.weekDay, filter: true, operator: '==' };

  ngOnDestroy(): void {}

  ngOnInit() {}
}
