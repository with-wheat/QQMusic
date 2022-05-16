// 轮播接口
export interface banners {
  adDispatchJson: any;
  adLocation: any;
  adSource: any;
  adid: any;
  encodeId: string;
  event: any;
  exclusive: false;
  extMonitor: any;
  extMonitorInfo: any;
  imageUrl: string;
  monitorBlackList: any;
  monitorClick: any;
  monitorClickList: any;
  monitorImpress: any;
  monitorImpressList: any;
  monitorType: any;
  program: any;
  scm: string;
  song: any;
  targetId: number;
  targetType: number;
  titleColor: string;
  typeTitle: string;
  url: any;
  video: any;
}
// 歌曲基本信息
export interface songInfoAl {
  id: number;
  name: string;
  pic: number;
  picUrl: string;
  pic_str: string;
  tns: any;
}
export interface songInfoAr {
  alias: any;
  id: number;
  name: string;
  tns: any;
}
//获取歌曲详情
export interface songInfo {
  a: any;
  al: songInfoAl;
  alia: any;
  ar: songInfoAr[];
  cd: string;
  cf: string;
  copyright: number;
  cp: number;
  crbt: any;
  djId: number;
  dt: number;
  entertainmentTags: any;
  fee: number;
  ftype: number;
  h: any;
  hr: any;
  id: number;
  l: any;
  m: any;
  mark: number;
  mst: number;
  mv: number;
  name: string;
  no: number;
  noCopyrightRcmd: any;
  originCoverType: number;
  originSongSimpleData: any;
  pop: number;
  pst: number;
  publishTime: number;
  resourceState: true;
  rt: string;
  rtUrl: any;
  rtUrls: any;
  rtype: number;
  rurl: any;
  s_id: number;
  single: number;
  songJumpInfo: any;
  sq: any;
  st: number;
  t: number;
  tagPicList: any;
  v: number;
  version: number;
}
