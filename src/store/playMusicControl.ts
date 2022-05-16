import { onMounted, onUnmounted, watch } from "vue";
import { defineStore, storeToRefs } from "pinia";
import type { songUrl } from "@/server/play/types.d";
import type { songInfo } from "@/server/recommend/type.d";
import { getSongUrl } from "@/server/play/playMusic";
import { songDetail } from "@/server/recommend";
import { ElMessage } from "element-plus";
import _ from "lodash";
export const playMusicControl = defineStore("playMusicControl", {
  state: () => {
    return {
      // new一个播放对象
      audio: new Audio(),
      // 播放列表
      playList: [] as songUrl[],
      // 默认不播放
      playState: false as boolean,
      // 播放歌曲类型
      playTypes: 0 as number, // 0顺序，1随机，2单曲
      // 音量
      volume: 60,
      // 是否静音
      mute: false,
      // 当前播放的音乐信息
      songUrl: {} as songUrl,
      // // 当前播放的音乐详情信息
      songInfo: {} as songInfo,
      // 当前播放的音乐地址
      url: "",
      // 当前音乐的id
      id: 0,
      //是否正在拖动进度条
      sliderInput: false,
      ended: false, //是否播放结束
      muted: false, //是否静音
      currentTime: 0, //当前播放时间
      duration: 0, //总播放时长
      songIndex: 0 //当前播放的音乐索引
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
    /**
     * 播放时间拖动中
     * @param val 音量大小
     */
    onSliderInput(val: number) {
      this.audio.currentTime = val;
    },
    /**
     * 定时器
     */
    interval() {
      if (this.playState && !this.sliderInput) {
        this.currentTime = parseInt(this.audio.currentTime.toString());
        this.duration = parseInt(this.audio.duration.toString());
        this.ended = this.audio.ended;
      }
    },
    /* 设置播放状态 */
    setPlayState() {
      if (this.playState) {
        // 暂停
        this.audio.pause();
      } else {
        // 开始
        this.audio.play();
      }
      this.playState = !this.playState;
    },
    /* 设置播放类型 */
    setPlayTypes() {
      if (this.playTypes == 0) {
        this.playTypes = this.playTypes + 1;
      } else if (this.playTypes == 1) {
        this.playTypes = this.playTypes + 1;
      } else {
        this.playTypes = 0;
        this.audio.loop;
      }
    },
    /* 设置播放音量 */
    setVolume() {
      console.log(11);
    },
    /* 设置是否静音 */
    setMute() {
      this.mute = !this.mute;
    },
    /**
     * 播放音乐
     * @param id 音乐id
     */
    async setSongInfo(id: number) {
      if (id == this.id) return;
      this.playState = true;
      this.getSongDetail(id);
      const SongUrl = await getSongUrl(id);
      if (SongUrl.url) {
        this.playList.push(SongUrl);
        this.audio.src = SongUrl?.url;
        this.audio.play().then(() => {
          // 获取歌曲详情
          this.playState = true;
          this.songUrl = SongUrl;
          this.url = SongUrl?.url;
          this.id = SongUrl?.id;
        });
      } else {
        ElMessage({
          message: "该歌曲展示无法播放！",
          type: "warning"
        });
      }
    },
    //播放结束
    playEnd() {
      switch (this.playTypes) {
        case 0:
          // 顺序播放
          this.next();
          break;
        case 1:
          // 随机
          this.randomPlay();
          break;
        case 2:
          // 单曲循环
          this.onePlay();
          break;
      }
    },
    // 下一曲
    next() {
      if (this.playList[this.songIndex + 1]) {
        this.setSongInfo(this.playList[this.songIndex + 1].id);
      } else {
        this.songIndex = 0;
        this.setSongInfo(this.playList[this.songIndex].id);
      }
    },
    prev() {
      if (this.playList[this.songIndex - 1]) {
        this.setSongInfo(this.playList[this.songIndex - 1].id);
      } else {
        this.songIndex = this.playList.length - 1;
        this.setSongInfo(this.playList[this.songIndex].id);
      }
    },
    /**
     * 随机播放
     */
    randomPlay() {
      this.setSongInfo(_.sample(this.playList).id);
    },
    /**
     * 单曲循环
     */
    onePlay() {
      this.audio.play();
    },
    /**
     * 获取歌曲详情
     * @param id 歌曲id
     */
    async getSongDetail(id: number) {
      const data = await songDetail(id);
      this.songInfo = data;
    },
    /**
     * 加入歌单列表
     * @param music 歌曲信息
     */
    setPlayMusic(music: songUrl) {
      this.playList = [...this.playList, music];
    }
  }
});
export const userPlayerInit = () => {
  let timer: NodeJS.Timer;
  const { interval, playEnd } = playMusicControl();

  const { ended } = storeToRefs(playMusicControl());

  //监听播放结束
  watch(ended, (ended) => {
    if (!ended) return;
    playEnd();
  });

  //启动定时器
  onMounted(() => {
    timer = setInterval(interval, 1000);
  });
  //清除定时器
  onUnmounted(() => {
    clearInterval(timer);
  });
};
