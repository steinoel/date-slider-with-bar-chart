import { Component } from '@angular/core';
import { DateSliderComponent } from './date-slider/date-slider.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DateSliderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  minDate: Date = new Date('2020-01-01');
  maxDate: Date = new Date();

  updateFilter(minDate: Date, maxDate: Date) {
    this.minDate = minDate;
    this.maxDate = maxDate;
  }
}
