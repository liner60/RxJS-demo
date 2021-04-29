export type DemoMethod = 'all' | 'excel' | 'luckyNumber';

export interface IResResult<T> {
  code: number;
  data: T;
  message: string;
}

export interface IProjectBaseInfo {
  projectName?: string;
  iconFileName?: string;
  iconUrl?: string;
  logoFileName?: string;
  logoUrl?: string;
  portalName?: string;
  maximumOfTab?: number;
  startupWaitSeconds?: number;
  ownerWorkNumber?: number;
  backstageEnvironmentURL?: string;
}
