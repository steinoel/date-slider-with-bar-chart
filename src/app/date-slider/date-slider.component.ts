import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-slider',
  standalone: true,
  templateUrl: './date-slider.component.html',
  styleUrls: ['./date-slider.component.css'],
  imports: [FormsModule, CommonModule],
})
export class DateSliderComponent implements OnInit {
  @ViewChild('slider', { static: false }) slider!: ElementRef;
  @Output() dateRangeChanged = new EventEmitter<{
    minDate: Date;
    maxDate: Date;
  }>();

  startDate: string = '2020-01-01';
  endDate: string = new Date().toISOString().split('T')[0];
  minValue: number = new Date(this.startDate).getTime();
  maxValue: number = this.getMonthEnd(new Date(this.endDate)).getTime();
  dragging: 'min' | 'max' | null = null;
  isMobile: boolean = false;

  ngOnInit() {
    this.checkScreenSize();
    this.logDates();
    this.emitDateRange();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 480;
  }

  private logDates() {
    console.log('Start Date:', this.startDate);
    console.log('End Date:', this.endDate);
    console.log('Min Value:', this.minValue);
    console.log('Max Value:', this.maxValue);
  }

  calculatePercentage(value: number): number {
    const range =
      new Date(this.endDate).getTime() - new Date(this.startDate).getTime();
    return ((value - new Date(this.startDate).getTime()) / range) * 100;
  }

  private getMonthStart(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  private getMonthEnd(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  get minDate(): string {
    return this.formatMonthYear(new Date(this.minValue));
  }

  get maxDate(): string {
    return this.formatMonthYear(new Date(this.maxValue));
  }

  private formatMonthYear(date: Date): string {
    return `${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  startDrag(event: MouseEvent | TouchEvent, handle: 'min' | 'max') {
    event.preventDefault();
    this.dragging = handle;
  }

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:touchmove', ['$event'])
  onMove(event: MouseEvent | TouchEvent) {
    if (!this.dragging) return;

    const clientX =
      (event as MouseEvent).clientX || (event as TouchEvent).touches[0].clientX;
    const rect = this.slider.nativeElement.getBoundingClientRect();
    const percentage = Math.max(
      0,
      Math.min(100, ((clientX - rect.left) / rect.width) * 100)
    );
    const timestamp =
      new Date(this.startDate).getTime() +
      (percentage / 100) *
        (new Date(this.endDate).getTime() - new Date(this.startDate).getTime());

    const monthStart = this.getMonthStart(new Date(timestamp));
    const monthEnd = this.getMonthEnd(new Date(timestamp));

    if (this.dragging === 'min') {
      this.minValue = Math.min(
        monthStart.getTime(),
        this.maxValue - 24 * 60 * 60 * 1000
      );
    } else if (this.dragging === 'max') {
      this.maxValue = Math.max(
        monthEnd.getTime(),
        this.minValue + 24 * 60 * 60 * 1000
      );
    }

    this.emitDateRange();
  }

  @HostListener('document:mouseup')
  @HostListener('document:touchend')
  stopDrag() {
    this.dragging = null;
  }

  updateStartDate(value: string) {
    this.startDate = value;
    this.onDateChange();
  }

  updateEndDate(value: string) {
    this.endDate = value;
    this.onDateChange();
  }

  onDateChange() {
    this.validateDates();
    this.minValue = new Date(this.startDate).getTime();
    this.maxValue = new Date(this.endDate).getTime();
    this.emitDateRange();
    console.log('Date pickers updated:', this.startDate, this.endDate);
  }

  private validateDates() {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    if (!(start instanceof Date) || isNaN(start.getTime())) {
      console.error('Invalid startDate:', this.startDate);
      this.startDate = '2020-01-01';
    }
    if (!(end instanceof Date) || isNaN(end.getTime())) {
      console.error('Invalid endDate:', this.endDate);
      this.endDate = new Date().toISOString().split('T')[0];
    }
  }

  private emitDateRange() {
    this.dateRangeChanged.emit({
      minDate: new Date(this.minValue),
      maxDate: new Date(this.maxValue),
    });
    console.log('Date range emitted:', this.minDate, this.maxDate);
  }
}
