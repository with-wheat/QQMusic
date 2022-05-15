import { defineStore } from "pinia";
export const playMusicControl = defineStore("playMusicControl", {
  state: () => {
    return {
      // 默认不播放
      playState: false as boolean,
      // 播放歌曲类型
      playTypes: 0 as number, // 0顺序，1随机，2单曲
      // 音量
      volume: 60,
      // 是否静音
      mute: false
    };
  },
  getters: {
    /* 获取播放状态 */
    getPlayState(state) {
      return state.playState;
    },
    /* 获取播放类型 */
    getPlayTypes(state) {
      return state.playTypes;
    },
    /* 获取播放音量 */
    getVolume(state) {
      return state.volume;
    }
  },
  actions: {
    /* 设置播放状态 */
    setPlayState() {
      this.playState = !this.playState;
    },
    /* 设置播放类型 */
    setPlayTypes() {
      if (this.playTypes == 0 || this.playTypes == 1) {
        this.playTypes = this.playTypes + 1;
      } else {
        this.playTypes = 0;
      }
    },
    /* 设置播放音量 */
    setVolume() {
      console.log(11);
    },
    /* 设置是否静音 */
    setMute() {
      this.mute = !this.mute;
    }
  }
});
