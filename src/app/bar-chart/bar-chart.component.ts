import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dataset } from '../data';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnChanges {
  @Input() minDate: Date = new Date('2020-01-01');
  @Input() maxDate: Date = new Date();

  chartData: {
    month: string;
    count: number;
    color: string;
    opacity: number;
  }[] = [];
  hoveredBar: { month: string; count: number; color: string } | null = null;

  private blueColors: string[] = [
    '#1E90FF',
    '#4682B4',
    '#87CEEB',
    '#00BFFF',
    '#ADD8E6',
  ];

  maxCount: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['minDate'] || changes['maxDate']) {
      this.updateChart();
    }
  }

  private updateChart() {
    const filteredData = dataset.filter((item) => {
      const date = new Date(item.date);
      return date >= this.minDate && date <= this.maxDate;
    });

    const monthCount: { [key: string]: number } = {};
    filteredData.forEach((item) => {
      const date = new Date(item.date);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
      monthCount[monthYear] = (monthCount[monthYear] || 0) + 1;
    });

    // Create a list of months in the range with opacity settings
    const monthsInRange = this.getMonthsInRange(this.minDate, this.maxDate);
    this.chartData = monthsInRange.map((monthYear, index) => {
      const count = monthCount[monthYear] || 0;
      return {
        month: monthYear,
        count: count,
        color: this.getColor(index),
        opacity: count > 0 ? 1 : 0.3, // Set opacity based on count
      };
    });

    this.maxCount = Math.max(...Object.values(monthCount), 1); // Prevent division by zero

    this.chartData.sort((a, b) => {
      const [yearA, monthA] = a.month.split('-').map(Number);
      const [yearB, monthB] = b.month.split('-').map(Number);
      return yearA !== yearB ? yearA - yearB : monthA - monthB;
    });
  }

  // Function to get all month-year pairs between two dates
  private getMonthsInRange(start: Date, end: Date): string[] {
    const months: string[] = [];
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();
    let currentMonth = start.getMonth();
    let currentYear = startYear;

    while (
      currentYear < endYear ||
      (currentYear === endYear && currentMonth <= end.getMonth())
    ) {
      months.push(`${currentYear}-${currentMonth + 1}`);
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
    }
    return months;
  }

  private getColor(index: number): string {
    return this.blueColors[index % this.blueColors.length];
  }

  getMonthYear(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
    };
    return date.toLocaleDateString('en-UK', options);
  }

  getBarHeight(count: number): number {
    const maxBarHeight = 100;
    return (count / this.maxCount) * maxBarHeight;
  }
}
