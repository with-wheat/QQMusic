import Request from "../index";
import type { loginCode, CodeImgType, CheckInfoType, userInfo } from "./types.d";
/**
 *
 * @returns 获取key
 */
export async function getCodeKey() {
  const { data } = await Request.get<{ data: loginCode }>({
    url: "/login/qr/key"
  });
  return data;
}
/**
 *
 * @param key 获取二维码的key值
 * @returns 二维码照片信息
 */
export async function getCodeImg(key: string) {
  const obj = {
    key: key,
    qrimg: true,
    timerstamp: Date.now()
  };
  const { data } = await Request.get<{ data: CodeImgType }>({
    url: "/login/qr/create",
    params: obj
  });
  return data;
}
/**
 * 轮训二维码信息
 * @param key 二维码的key
 * @returns 查询二维码信息
 */
export async function getCheckInfo(key: string) {
  const data = await Request.get<CheckInfoType>({
    url: "/login/qr/check",
    params: {
      key: key,
      timerstamp: Date.now()
    }
  });
  return data;
}

/**
 *
 * @param cookieId TOKEN 值
 * @returns
 */
export async function getUserState(cookieId: string) {
  const { data } = await Request.post<{ data: userInfo }>({
    url: "/login/status",
    params: { cookie: cookieId }
  });
  return data;
}
