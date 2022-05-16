export interface freeTimeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
  type: number;
  remainTime: number;
}
export interface freeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
  listenType: any;
}
// 歌曲url信息
export interface songUrl {
  br: number;
  canExtend: boolean;
  code: number;
  encodeType: string;
  expi: number;
  fee: number;
  flag: number;
  freeTimeTrialPrivilege: freeTimeTrialPrivilege;
  freeTrialInfo: any;
  freeTrialPrivilege: freeTrialPrivilege;
  gain: number;
  id: number;
  level: string;
  md5: string;
  payed: number;
  size: number;
  type: string;
  uf: any;
  url: string;
  urlSource: number;
}
