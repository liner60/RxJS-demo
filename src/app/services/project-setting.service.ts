import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { IProjectBaseInfo, IResResult } from '../models/demo';
import { shareReplay } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root',
})
export class ProjectSettingService {
  // 缓存系统应用配置
  private _cacheProjectSetting$: Observable<IProjectBaseInfo>;

  public get projectSettingData(): Observable<IProjectBaseInfo> {
    if (!this._cacheProjectSetting$) {
      this._cacheProjectSetting$ = this.getProjectSetting()
        .pipe(
          shareReplay(1)
        );
    }
    return this._cacheProjectSetting$;
  }

  constructor(private http: HttpClient) {
  }

  public getProjectSetting(): Observable<IProjectBaseInfo> {
    const url = '/seaApi/personals/project-setting';
    return this.http.get(url)
      .pipe(
        map((res: IResResult<IProjectBaseInfo>) => {
          return res.data;
        })
      );
  }
}
