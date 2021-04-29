import { Component, OnInit } from '@angular/core';
import { AsyncSubject, combineLatest, forkJoin, Observable, Subject, timer } from 'rxjs/index';
import { filter, map, take, takeUntil, takeWhile, tap } from 'rxjs/internal/operators';

@Component({
  selector: 'app-lucky-number',
  templateUrl: './lucky-number.component.html',
  styleUrls: ['./lucky-number.component.scss']
})
export class LuckyNumberComponent implements OnInit {
  public source$: Observable<number>;
  public luckyNumber1$ = new AsyncSubject<number>();
  public luckyNumber2$ = new AsyncSubject<number>();
  public result$: Observable<boolean>;

  public showNumber1: number;
  public showNumber2: number;

  public stop1$ = new Subject();
  public stop2$ = new Subject();

  constructor() {
  }

  ngOnInit() {
    this.source$ = timer(10, 10)
      .pipe(
        map(val => Math.floor(Math.random() * 10))
      );

    this.result$ = forkJoin(this.luckyNumber1$.asObservable(), this.luckyNumber2$.asObservable())
      .pipe(
        map(([number1, number2]: number[]) => number1 === number2)
      );
  }

  public start1(): void {
    this.source$
      .pipe(
        tap(val => this.showNumber1 = val),
        takeUntil(this.stop1$)
      )
      .subscribe(this.luckyNumber1$);
  }

  public stop1(): void {
    this.stop1$.next();
    this.stop1$.complete();
  }

  public start2(): void {
    this.source$
      .pipe(
        tap(val => this.showNumber2 = val),
        takeUntil(this.stop2$)
      )
      .subscribe(this.luckyNumber2$);
  }

  public stop2(): void {
    this.stop2$.next();
    this.stop2$.complete();
  }

}
