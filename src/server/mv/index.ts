import Request from "../index";
import { mvInfoTypes } from "./types.d";
/**
 * 获取mv播放接口
 * @param id MViD
 * @returns
 */
export async function getMvUrl(id: number) {
  const { data } = await Request.get<{ data: mvInfoTypes }>({
    url: "/mv/url",
    params: {
      id: id
    }
  });
  return data;
}
