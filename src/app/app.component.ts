import { Component } from '@angular/core';
import { DateSliderComponent } from './date-slider/date-slider.component';
import { DateTableComponent } from './date-table/date-table.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DateSliderComponent, DateTableComponent, BarChartComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  minDate: Date = new Date('2020-01-01');
  maxDate: Date = new Date();

  updateFilter(minDate: Date, maxDate: Date) {
    this.minDate = minDate;
    this.maxDate = maxDate;
    console.log('Updated minDate:', this.minDate);
    console.log('Updated maxDate:', this.maxDate);
  }
}
