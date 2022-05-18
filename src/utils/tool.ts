/**
 *
 * @param func 执行的函数
 * @param time 时间
 * @param immediate 是否立即执行
 * @returns
 */
export function debounce(func: any, time: number, immediate = false) {
  let timer: number | null = null;
  return (...args: any) => {
    if (timer) clearInterval(timer);
    if (immediate) {
      if (!timer) func.apply(this, args);
      timer = window.setTimeout(() => {
        timer = null;
      }, time);
    } else {
      timer = window.setTimeout(() => {
        func.apply(this, args);
      }, time);
    }
  };
}
