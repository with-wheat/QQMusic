/**
 * 将数字转为时间格式
 * @param sec 数值
 * @returns 返回对应的时间
 */
export function secondsFormat(sec: number) {
  let hour: string | number = Math.floor(sec / 3600);
  let minute: string | number = Math.floor((sec - hour * 3600) / 60);
  let second: string | number = sec - hour * 3600 - minute * 60;
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  return minute + ":" + second;
}
