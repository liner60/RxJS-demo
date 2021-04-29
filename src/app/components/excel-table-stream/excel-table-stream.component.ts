import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject, combineLatest, concat, from, interval, merge, Observable, of, Subject, timer,
  zip
} from 'rxjs/index';
import {
  map
} from 'rxjs/internal/operators';

@Component({
  selector: 'app-excel-table-stream',
  templateUrl: './excel-table-stream.component.html',
  styleUrls: ['./excel-table-stream.component.scss']
})
export class ExcelTableStreamComponent implements OnInit {
  public number1$ = new Subject<number>();
  public number2$ = new Subject<number>();
  public number3$ = new Subject<number>();
  public sum$: Observable<number>;
  public average$: Observable<number>;

  ngOnInit() {
    this.sum$ = combineLatest(
      this.number1$.asObservable(),
      this.number2$.asObservable(),
      this.number3$.asObservable()
    )
      .pipe(
        map(([number1, number2, number3]: number[]) => number1 + number2 + number3)
      );

    this.average$ = this.sum$
      .pipe(
        map((sum: number) => sum / 3)
      );
  }

  public reset(): void {
    this.number2$.next();
    this.number1$.next();
    this.number3$.next();
  }

}
