import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject, combineLatest, concat, from, interval, merge, Observable, of, Subject, timer,
  zip
} from 'rxjs/index';
import {
  map, reduce, publish, publishReplay, refCount, share, take, shareReplay,
  toArray, distinctUntilChanged
} from 'rxjs/internal/operators';

@Component({
  selector: 'app-excel-table',
  templateUrl: './excel-table.component.html',
  styleUrls: ['./excel-table.component.scss']
})
export class ExcelTableComponent implements OnInit {
  public number1: number;
  public number2: number;
  public number3: number;
  public sum: number;
  public average: number;

  constructor() {
  }

  ngOnInit() {
  }

  public onValue1Change(value: number): void {
    this.number1 = value;
    this.onValueChange();
  }

  public onValue2Change(value: number): void {
    this.number2 = value;
    this.onValueChange();
  }

  public onValue3Change(value: number): void {
    this.number3 = value;
    this.onValueChange();
  }

  public reset(): void {
    this.number1 = null;
    this.number2 = null;
    this.number3 = null;
    this.onValueChange();
  }

  private onValueChange(): void {
    this.updateSum();
    this.updateAverage();
  }

  private updateSum(): void {
    if (!this.isNullOrUndefined(this.number1)
      && !this.isNullOrUndefined(this.number2)
      && !this.isNullOrUndefined(this.number3)) {
      this.sum = this.number1 + this.number2 + this.number3;
    } else {
      this.sum = null;
    }
  }

  private updateAverage(): void {
    if (!this.isNullOrUndefined(this.sum)) {
      this.average = this.sum / 3;
    } else {
      this.average = null;
    }
  }

  private isNullOrUndefined(val: number | undefined | null): boolean {
    return typeof val === 'undefined' || val === null;
  }

}
