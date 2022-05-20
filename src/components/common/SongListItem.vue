<template>
  <div class="songItem" :class="song.id == playStore.id ? 'active' : ''">
    <div class="song">
      <div class="songName">
        <IconPark class="love" :icon="Like" size="16" />
        <div class="truncate">
          <small>{{ song.name }}</small>
        </div>
        <IconPark v-if="song.mv > 0" class="video" size="16" :icon="PlayTwo" @click="playVideo" />
      </div>
      <div class="btn">
        <div>
          <IconPark title="播放" :icon="PlayOne" size="20" @click="playSong" />
          <IconPark title="添加到" :icon="Add" size="16" />
          <IconPark title="下载" :icon="DownTwo" size="16" />
          <IconPark title="更多操作" :icon="MoreTwo" size="16" />
        </div>
      </div>
    </div>
    <div>
      <div>
        <small>{{ song.ar[0].name }}</small>
      </div>
    </div>
    <div>
      <div class="album">
        <small>{{ song.al.name }}</small>
      </div>
    </div>
    <div>
      <div>
        <small>{{ secondsFormat(song.dt / 1000) }}</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Add, DownTwo, Like, MoreTwo, PlayOne, PlayTwo } from "@icon-park/vue-next";
import IconPark from "@/components/icon";
import type { songInfo } from "@/server/recommend/type";
import { secondsFormat } from "@/utils/timer";
import { playMusicControl } from "@/store/playMusicControl";
import { useRouter } from "vue-router";
const props = defineProps<{
  song: songInfo;
}>();

const router = useRouter();

const playStore = playMusicControl();
/**
 * 播放歌曲
 */
const playSong = () => {
  playStore.setSongInfo(props.song.id);
};
const playVideo = () => {
  router.push({ path: "/video", query: { videoId: props.song.mv } });
};
</script>

<style lang="less" scoped>
.songItem {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 15px 0;
  color: @fontColor1;
  div {
    flex: 4;
    display: flex;
    align-items: center;
    span {
      display: flex;
      align-items: center;
    }
  }
  div:last-child {
    flex: 1;
  }

  .song {
    flex: 6;
    display: flex;
    .songName {
      width: 120px;
      .truncate {
        flex: 0;
        small {
          margin: 0 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      span:hover {
        cursor: pointer;
      }
      .love:hover {
        cursor: pointer;
        color: red;
      }
      .video:hover {
        cursor: pointer;
        color: @color;
      }
    }
    .btn {
      flex: 2;
      box-sizing: border-box;
      visibility: hidden;
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          padding: 0 5px;
          box-sizing: border-box;
        }
        span:hover {
          color: @color;
          cursor: pointer;
        }
      }
    }
  }
  .album {
    width: 120px;

    small {
      margin: 0 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.songItem:hover {
  cursor: pointer;
  background-color: rgba(218, 217, 217, 0.2);
  .btn {
    visibility: visible;
  }
}
.active {
  background-color: rgb(236 253 245 0.5);
}
</style>
