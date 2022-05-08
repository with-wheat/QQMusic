import Request from "../index";
import type { searchTopTyp, SearchSuggest } from "./types";
/**
 * 获取热门搜搜信息
 * @returns 热门搜索信息
 */
export async function searchTop() {
  const { data } = await Request.get<{ data: searchTopTyp[] }>({
    url: "search/hot/detail"
  });
  return data;
}
/**
 * 搜索歌曲信息
 * @returns 搜索歌曲
 */
export async function searchInfo(params: string) {
  const { result } = await Request.get<{ result: SearchSuggest }>({
    url: "search/suggest",
    params: { keywords: params }
  });
  return result;
}
