import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs/index';
import { DemoMethod } from '../models/demo';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  // 页面间通信用BehaviorSubject,缓存最新一条数据。订阅可以晚于数据产生
  public demoSelector$: BehaviorSubject<DemoMethod> = new BehaviorSubject<DemoMethod>('all');

  // 普通的Subject，必须保证订阅早于数据产生
  public demoSelector2$: Subject<DemoMethod> = new Subject<DemoMethod>();

  // 用ReplaySubject实现缓存5条历史数据
  public history$: ReplaySubject<DemoMethod> = new ReplaySubject<DemoMethod>(5);

  constructor() {
  }
}
