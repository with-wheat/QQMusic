import Request from "../index";
import type { PersonalizedTypes, newSongTypes, newMvTypes, PlayListTypes } from "./type";

import { songInfo } from "../recommend/type.d";
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

/**
 *
 * @returns 获取推荐mv信息
 */
export async function getNewMv() {
  const { result } = await Request.get<{ result: newMvTypes[] }>({
    url: "/personalized/mv"
  });
  return result;
}
/**
 * 获取歌单详情信息
 * @param PlayId 歌单id
 */
export async function getPlayList(PlayId: number) {
  const data = Request.get<PlayListTypes>({
    url: "/playlist/detail",
    params: {
      id: PlayId
    }
  });
  return data;
}
/**
 * 获取歌单所有歌曲
 * @param PlayId 歌单id
 */
export async function getPlaySongList(PlayId: number) {
  const { songs } = await Request.get<{ songs: songInfo[] }>({
    url: "/playlist/track/all",
    params: {
      id: PlayId
    }
  });
  return songs;
}
