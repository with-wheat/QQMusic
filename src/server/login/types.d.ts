// 获取key
export interface loginCode {
  code: number;
  unikey: string;
}
// 二维码照片
export interface CodeImgType {
  qrimg: string;
  qrurl: string;
}
// 扫码登录接口
export interface CheckInfoType {
  code: number;
  cookie: string;
  message: string;
}
// 账户心虚
export interface account {
  anonimousUser: boolean;
  ban: number;
  baoyueVersion: number;
  createTime: any;
  donateVersion: number;
  id: number;
  paidFee: boolean;
  status: number;
  tokenVersion: number;
  type: number;
  userName: string;
  vipType: number;
  whitelistAuthority: number;
}
// 详情
export interface profile {
  accountStatus: number;
  accountType: number;
  anchor: boolean;
  authStatus: number;
  authenticated: boolean;
  authenticationTypes: number;
  authority: number;
  avatarDetail: null;
  avatarImgId: number;
  avatarUrl: string;
  backgroundImgId: number;
  backgroundUrl: string;
  birthday: number;
  city: number;
  createTime: number;
  defaultAvatar: boolean;
  description: null;
  detailDescription: null;
  djStatus: number;
  expertTags: null;
  experts: null;
  followed: boolean;
  gender: number;
  lastLoginIP: string;
  lastLoginTime: number;
  locationStatus: number;
  mutual: boolean;
  nickname: string;
  province: number;
  remarkName: null;
  shortUserName: string;
  signature: null;
  userId: number;
  userName: string;
  userType: number;
  vipType: number;
  viptypeVersion: number;
}

// 用户信息
export interface userInfo {
  account: account;
  code: number;
  profile: profile;
}
