import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { DemoMethod, IProjectBaseInfo } from '../../models/demo';
import { partition, Subject } from 'rxjs/index';
import { takeUntil } from 'rxjs/internal/operators';
import { ProjectSettingService } from '../../services/project-setting.service';

@Component({
  selector: 'app-demo-detail',
  templateUrl: './demo-detail.page.html',
  styleUrls: ['./demo-detail.page.scss']
})
export class DemoDetailComponent implements OnInit, OnDestroy {
  public projectSetting: IProjectBaseInfo;
  public isExcelDemoShow: boolean;
  public isLuckyDemoShow: boolean;
  public historyArr: DemoMethod[] = [];

  private destroy$: Subject<void> = new Subject<void>();

  constructor(public stateService: StateService,
              private projectSettingService: ProjectSettingService) {
  }

  ngOnInit() {
    const [all$, part$] = partition(this.stateService.demoSelector$, val => val === 'all');
    const [excelPart$, luckyPart$] = partition(part$, val => val === 'excel');
    all$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        this.isExcelDemoShow = true;
        this.isLuckyDemoShow = true;
      });

    excelPart$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        this.isExcelDemoShow = true;
        this.isLuckyDemoShow = false;
      });

    luckyPart$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        this.isExcelDemoShow = false;
        this.isLuckyDemoShow = true;
      });

    this.stateService.history$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        console.log(res);
        this.historyArr = [...this.historyArr, res];
      });


    this.initProjectSetting();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initProjectSetting(): void {
    this.projectSettingService.projectSettingData
      .subscribe(data => {
        console.log(data);
        this.projectSetting = data;
      });
  }

}
