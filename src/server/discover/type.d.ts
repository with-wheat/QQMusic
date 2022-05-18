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

// 推荐mv信息
export interface artistsType {
  id: number;
  name: string;
}
export interface newMvTypes {
  alg: string;
  artistId: number;
  artistName: string;
  artists: artistsType[];
  canDislike: boolean;
  copywriter: string;
  duration: number;
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
  subed: boolean;
  trackNumberUpdateTime: any;
  type: number;
}

// 歌单详情
export interface playlistType {
  adType: number;
  backgroundCoverId: number;
  backgroundCoverUrl: any;
  cloudTrackCount: number;
  commentCount: number;
  commentThreadId: string;
  coverImgId: number;
  coverImgId_str: string;
  coverImgUrl: string;
  createTime: number;
  creator: any;
  description: string;
  englishTitle: any;
  highQuality: boolean;
  historySharedUsers: any;
  id: number;
  name: string;
  newImported: boolean;
  officialPlaylistType: any;
  opRecommend: boolean;
  ordered: boolean;
  playCount: number;
  privacy: number;
  remixVideo: any;
  shareCount: number;
  sharedUsers: any;
  specialType: number;
  status: number;
  subscribed: boolean;
  subscribedCount: number;
  subscribers: any;
  tags: string[];
  titleImage: number;
  titleImageUrl: any;
  trackCount: number;
  trackIds: any;
  trackNumberUpdateTime: number;
  trackUpdateTime: number;
  tracks: any;
  updateFrequency: any;
  updateTime: number;
  userId: number;
  videoIds: any;
  videos: any;
}
export interface privilegesType {
  chargeInfoList: any;
  cp: number;
  cs: boolean;
  dl: number;
  dlLevel: string;
  downloadMaxBrLevel: string;
  downloadMaxbr: number;
  fee: number;
  fl: number;
  flLevel: string;
  flag: number;
  freeTrialPrivilege: any;
  id: number;
  maxBrLevel: string;
  maxbr: number;
  paidBigBang: boolean;
  payed: number;
  pc: any;
  pl: number;
  plLevel: string;
  playMaxBrLevel: string;
  playMaxbr: number;
  preSell: boolean;
  realPayed: number;
  rscl: any;
  sp: number;
  st: number;
  subp: number;
  toast: boolean;
}
export interface PlayListTypes {
  code: number;
  playlist: playlistType;
  privileges: privilegesType[];
  relatedVideos: any;
  resEntrance: any;
  sharedPrivilege: any;
  urls: any;
}

/**
 * 歌单的所有歌曲信息
 */
// export interface playSongListAr {
//   alias: any[];
//   id: number;
//   name: string;
//   tns: any[];
// }
// export interface playSongListAl {
//   id: number;
//   name: string;
//   pic: number;
//   picUrl: string;
//   pic_str: string;
//   tns: any[];
// }
// export interface playSongList {
//   a: any;
//   al: playSongListAl;
//   alia: any[];
//   ar: playSongListAr[];
//   cd: string;
//   cf: string;
//   copyright: number;
//   cp: number;
//   crbt: any;
//   djId: number;
//   dt: number;
//   entertainmentTags: any;
//   fee: number;
//   ftype: number;
//   h: any;
//   hr: any;
//   id: number;
//   l: any;
//   m: any;
//   mark: number;
//   mst: number;
//   mv: number;
//   name: string;
//   no: number;
//   noCopyrightRcmd: any;
//   originCoverType: number;
//   originSongSimpleData: any;
//   pop: number;
//   pst: number;
//   publishTime: number;
//   resourceState: boolean;
//   rt: string;
//   rtUrl: any;
//   rtUrls: any[];
//   rtype: number;
//   rurl: any;
//   s_id: number;
//   single: number;
//   songJumpInfo: any;
//   sq: any;
//   st: number;
//   t: number;
//   tagPicList: any;
//   v: number;
//   version: number;
// }
