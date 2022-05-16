import Request from "../index";
import type { PersonalizedTypes, newSongTypes } from "./type";

/**
 * 获取推荐歌单
 * @param limit 推荐歌单数量
 */
export async function Personalized(limit: number) {
  const { result } = await Request.get<PersonalizedTypes>({
    url: "/personalized",
    params: {
      limit: limit
    }
  });
  return result;
}
/**
 * 获取对讲歌曲列表
 * @param limit 歌曲数量
 * @returns
 */
export async function getNewSong(limit: number) {
  const { result } = await Request.get<{ result: newSongTypes[] }>({
    url: "/personalized/newsong",
    params: {
      limit: limit
    }
  });
  return result;
}
