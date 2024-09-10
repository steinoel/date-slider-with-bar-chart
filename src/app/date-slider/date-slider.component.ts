import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-date-slider',
  standalone: true,
  templateUrl: './date-slider.component.html',
  styleUrls: ['./date-slider.component.css'],
})
export class DateSliderComponent {
  @ViewChild('slider', { static: true }) slider!: ElementRef;

  startDate: Date = new Date('2020-01-01');
  endDate: Date = new Date();
  minValue: number = this.startDate.getTime();
  maxValue: number = this.endDate.getTime();
  dragging: 'min' | 'max' | null = null;

  constructor() {
    this.maxValue = this.roundToMonthOrToday(this.endDate.getTime());
    if (this.minValue >= this.maxValue) {
      this.minValue = this.startDate.getTime();
    }
  }

  calculatePercentage(value: number): number {
    return (
      ((value - this.startDate.getTime()) /
        (this.endDate.getTime() - this.startDate.getTime())) *
      100
    );
  }

  roundToMonthOrToday(timestamp: number): number {
    const date = new Date(timestamp);
    const startOfMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    ).getTime();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startOfCurrentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    ).getTime();

    if (timestamp >= today.getTime()) {
      return startOfCurrentMonth;
    }

    const startOfNextMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      1
    ).getTime();
    const middleOfMonth = startOfMonth + (startOfNextMonth - startOfMonth) / 2;
    return timestamp < middleOfMonth ? startOfMonth : startOfNextMonth;
  }

  get minDate(): string {
    return this.isToday(this.minValue)
      ? this.formatFullDate(new Date(this.minValue))
      : this.formatMonthYear(new Date(this.minValue));
  }

  get maxDate(): string {
    return this.isToday(this.maxValue)
      ? this.formatFullDate(new Date(this.maxValue))
      : this.formatMonthYear(new Date(this.maxValue));
  }

  private isToday(date: number): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(date).toDateString() === today.toDateString();
  }

  private formatMonthYear(date: Date): string {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${year}`;
  }

  private formatFullDate(date: Date): string {
    return date.toLocaleDateString();
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
    const offsetX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    const timestamp =
      this.startDate.getTime() +
      (percentage / 100) * (this.endDate.getTime() - this.startDate.getTime());
    const roundedTimestamp = this.roundToMonthOrToday(timestamp);

    if (this.dragging === 'min') {
      if (
        roundedTimestamp < this.maxValue &&
        roundedTimestamp < this.endDate.getTime() - 24 * 60 * 60 * 1000
      ) {
        this.minValue = roundedTimestamp;
      }
    } else if (this.dragging === 'max') {
      if (roundedTimestamp > this.minValue) {
        this.maxValue = roundedTimestamp;
      }
    }
  }

  @HostListener('document:mouseup')
  @HostListener('document:touchend')
  stopDrag() {
    this.dragging = null;
  }
}
