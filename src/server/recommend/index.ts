import Request from "../index";
import type { banners } from "./type.d";
import type { songInfo } from "@/server/recommend/type.d";
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

/**
 * 获取歌曲详情
 * @param ids 歌曲id
 * @returns
 */
export async function songDetail(ids: number) {
  const { songs } = await Request.get<{ songs: songInfo[] }>({
    url: "/song/detail",
    params: { ids: ids, t: new Date() }
  });
  return songs[0];
}
