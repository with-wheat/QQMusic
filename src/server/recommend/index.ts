import Request from "../index";
import type { banners } from "./type.d";
/**
 * 获取轮播图信息
 * @param num 歌曲数量
 * @returns 推荐歌曲信息
 */
export async function banner(type: number) {
  const { banners } = await Request.get<{ banners: banners[] }>({
    url: "/banner",
    params: { type: type }
  });
  return banners;
}
