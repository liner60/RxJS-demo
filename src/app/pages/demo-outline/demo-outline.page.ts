import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { DemoMethod, IProjectBaseInfo } from '../../models/demo';
import { ProjectSettingService } from '../../services/project-setting.service';

@Component({
  selector: 'app-demo-outline',
  templateUrl: './demo-outline.page.html',
  styleUrls: ['./demo-outline.page.scss']
})
export class DemoOutlineComponent implements OnInit {
  public projectSetting: IProjectBaseInfo;
  public demoMethod: DemoMethod;

  constructor(private stateService: StateService,
              private projectSettingService: ProjectSettingService) {
  }

  ngOnInit() {
    this.stateService.demoSelector$
      .subscribe(res => {
        this.demoMethod = res;
      });

    this.initProjectSetting();
  }

  public onSelectDemo(): void {
    this.stateService.demoSelector$.next(this.demoMethod);
    this.stateService.demoSelector2$.next(this.demoMethod);
    this.stateService.history$.next(this.demoMethod);
  }

  private initProjectSetting(): void {
    this.projectSettingService.projectSettingData
      .subscribe(data => {
        this.projectSetting = data;
      });
  }

}


