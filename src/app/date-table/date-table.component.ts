import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dataset } from '../data';

@Component({
  selector: 'app-date-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-table.component.html',
  styleUrls: ['./date-table.component.css'],
})
export class DateTableComponent implements OnChanges {
  @Input() minDate!: Date;
  @Input() maxDate!: Date;

  filteredData: any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['minDate'] || changes['maxDate']) {
      this.filterData();
    }
  }

  private filterData() {
    const minTimestamp = this.minDate.getTime();
    const maxTimestamp = this.maxDate.getTime();

    this.filteredData = dataset
      .filter((item) => {
        const itemTimestamp = new Date(item.date).getTime();
        return itemTimestamp >= minTimestamp && itemTimestamp <= maxTimestamp;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 20);
  }
}
