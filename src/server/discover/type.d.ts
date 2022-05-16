// 推荐歌单信息
export interface playListTypes {
  alg: string;
  canDislike: boolean;
  copywriter: string;
  highQuality: boolean;
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
  trackCount: number;
  trackNumberUpdateTime: number;
  type: number;
}
export interface PersonalizedTypes {
  category: number;
  code: number;
  hasTaste: boolean;
  result: playListTypes[];
}

// 推荐歌曲信息
export interface artists {
  albumSize: number;
  alias: any[];
  briefDesc: string;
  id: number;
  img1v1Id: number;
  img1v1Url: string;
  musicSize: number;
  name: string;
  picId: number;
  picUrl: string;
  topicPerson: number;
  trans: string;
}
export interface song {
  album: any;
  alias: string[];
  artists: artists[];
  audition: any;
  bMusic: any;
  commentThreadId: string;
  copyFrom: string;
  copyright: number;
  copyrightId: number;
  crbt: any;
  dayPlays: number;
  disc: string;
  duration: number;
  exclusive: boolean;
  fee: number;
  ftype: number;
  hMusic: any;
  hearTime: number;
  hrMusic: any;
  id: number;
  lMusic: any;
  mMusic: any;
  mark: number;
  mp3Url: any;
  mvid: number;
  name: string;
  no: number;
  noCopyrightRcmd: any;
  originCoverType: number;
  originSongSimpleData: any;
  playedNum: number;
  popularity: number;
  position: number;
  privilege: any;
  ringtone: string;
  rtUrl: any;
  rtUrls: any[];
  rtype: number;
  rurl: any;
  score: number;
  sign: any;
  single: number;
  sqMusic: any;
  starred: boolean;
  starredNum: number;
  status: number;
  transName: any;
}
export interface newSongTypes {
  alg: string;
  canDislike: boolean;
  copywriter: any;
  id: number;
  name: string;
  picUrl: string;
  song: song;
  trackNumberUpdateTime: any;
  type: number;
}
