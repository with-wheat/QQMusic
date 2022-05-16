import Request from "../index";
import type { songUrl } from "./types.d";
/**
 * 获取歌曲的播放地址
 * @param id 歌曲id
 * @returns
 */
export async function getSongUrl(id: number) {
  const { data } = await Request.get<{ data: songUrl[] }>({
    url: "/song/url",
    params: {
      id: id
    }
  });
  return data[0];
}
