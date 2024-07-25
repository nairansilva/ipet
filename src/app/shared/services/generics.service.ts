import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GenericsService {
  constructor() {}

  getWeekDayString() {
    var diaSemana = [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ];

    let result = new Date();
    let day = result.getDay();
    return diaSemana[day];
  }
}
