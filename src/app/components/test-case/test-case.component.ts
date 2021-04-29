import { Component, OnInit } from '@angular/core';
import {
  AsyncSubject, BehaviorSubject, ConnectableObservable, interval, of, ReplaySubject, Subject,
  timer
} from 'rxjs/index';
import { publish, share, take } from 'rxjs/internal/operators';

@Component({
  selector: 'app-test-case',
  templateUrl: './test-case.component.html',
  styleUrls: ['./test-case.component.scss']
})
export class TestCaseComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
     this.case1();
    // this.case2();
    // this.case3();
    // this.case4();
    // this.case5();
    // this.case6();
    // this.case7();
  }

  // 冷Observable
  case1(): void {
    const source$ = interval(100)
      .pipe(
        take(3)
      );

    setTimeout(() => {
      source$.subscribe(res => {
        console.log('observer1:', res);
      });
    }, 500);

    source$.subscribe(res => {
      console.log('observer2:', res);
    });
  }

  // 暖Observable
  case2(): void {
    const source$ = interval(100)
      .pipe(
        take(3),
        share()
      );

    setTimeout(() => {
      source$.subscribe(res => {
        console.log('observer1:', res);
      });

      setTimeout(() => {
        source$.subscribe(res => {
          console.log('observer2:', res);
        });
      }, 200);
    }, 200);

    setTimeout(() => {
      source$.subscribe(res => {
        console.log('observer3:', res);
      });
    }, 1000);
  }

  // 热Observable
  case3(): void {
    const source$ = (interval(100)
      .pipe(
        take(3),
        publish()
      ) as ConnectableObservable<number>);

    source$.connect();

    setTimeout(() => {
      source$.subscribe(res => {
        console.log('observer1:', res);
      });

      setTimeout(() => {
        source$.subscribe(res => {
          console.log('observer2:', res);
        });
      }, 200);
    }, 100);

    setTimeout(() => {
      source$.subscribe(res => {
        console.log('observer3:', res);
      });
    }, 1000);
  }

  // subject
  case4(): void {
    const subject = new Subject();

    subject.subscribe(res => {
      console.log('observer1:', res);
    });

    subject.next(1);
    subject.next(2);

    subject.subscribe(res => {
      console.log('observer2:', res);
    });

    subject.next(3);
  }

  // BehaviorSubject
  case5(): void {
    const subject = new BehaviorSubject(-1);

    subject.subscribe(res => {
      console.log('observer1:', res);
    });

    subject.next(1);
    subject.next(2);

    subject.subscribe(res => {
      console.log('observer2:', res);
    });

    subject.next(3);
  }

  // ReplaySubject
  case6(): void {
    const subject = new ReplaySubject(2);

    subject.subscribe(res => {
      console.log('observer1:', res);
    });

    subject.next(1);
    subject.next(2);
    subject.next(3);

    subject.subscribe(res => {
      console.log('observer2:', res);
    });

    subject.next(4);
  }

  // AsyncSubject
  case7(): void {
    const subject = new AsyncSubject();

    subject.subscribe(res => {
      console.log('observer1:', res);
    });

    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.complete();

    subject.subscribe(res => {
      console.log('observer2:', res);
    });

    subject.next(4);
    subject.complete();
  }

}
