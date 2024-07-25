import { GenericsService } from './../../shared/services/generics.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private genericsService: GenericsService) {}
  dateToday =
    this.genericsService.getWeekDayString() +
    ' - ' +
    new Date().toLocaleDateString();
  pets: any[] = [];
  ngOnDestroy(): void {}

  ngOnInit() {
    this.pets = [
      {
        name: 'cacorro',
        type: 'cat',
        picture: 'foto',
      },
      {
        name: 'gato',
        type: 'cachorro',
        picture: 'foto',
      },
      {
        name: 'gato',
        type: 'cachorro',
        picture: 'foto',
      },
      {
        name: 'gato',
        type: 'cachorro',
        picture: 'foto',
      },
      {
        name: 'gato',
        type: 'cachorro',
        picture: 'foto',
      },
      {
        name: 'gato',
        type: 'cachorro',
        picture: 'foto',
      },
      {
        name: 'gato',
        type: 'cachorro',
        picture: 'foto',
      },
      {
        name: 'gato',
        type: 'cachorro',
        picture: 'foto',
      },
      {
        name: 'gato',
        type: 'cachorro',
        picture: 'foto',
      },
    ];
  }
}
