<template>
  <div class="controlMusic">
    <IconPart
      class="icon"
      :icon="getPlayTypes == 0 ? LoopOnce : getPlayTypes == 1 ? ShuffleOne : PlayOnce"
      theme="filled"
      :size="24"
      @click="playTypeClick"
    ></IconPart>
    <IconPart
      class="icon"
      :icon="GoStart"
      theme="filled"
      :size="24"
      @click="
        () => {
          playStore.playEnd();
        }
      "
    ></IconPart>
    <IconPart
      class="play icon"
      :icon="getPlayState ? PauseOne : Play"
      theme="filled"
      :size="45"
      @click="starClick"
    ></IconPart>
    <IconPart
      class="icon"
      :icon="GoEnd"
      theme="filled"
      :size="24"
      @click="
        () => {
          playStore.playEnd();
        }
      "
    ></IconPart>
    <el-popover style="min-width: 50px" placement="top" :width="50">
      <template #reference>
        <IconPart class="icon" :icon="VolumeSmall" size="20" :stroke-width="3" />
      </template>
      <Volume />
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import IconPart from "@/components/icon/index";
import { storeToRefs } from "pinia";
import { playMusicControl } from "@/store/playMusicControl";
import Volume from "./volume.vue";
import {
  LoopOnce,
  ShuffleOne,
  PlayOnce,
  GoStart,
  GoEnd,
  PauseOne,
  Play,
  VolumeSmall
} from "@icon-park/vue-next";
const { getPlayState, getPlayTypes } = storeToRefs(playMusicControl());
const playStore = playMusicControl();
// 播放类型点击事件
const playTypeClick = () => {
  playStore.setPlayTypes();
};
// 播放暂停点击事件
const starClick = () => {
  playStore.setPlayState();
};
</script>

<style scoped lang="less">
.controlMusic {
  width: 230px;
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .icon {
    cursor: pointer;
  }
  .icon:hover {
    color: @color;
  }
  .play {
    color: @color;
  }
  .el-popover {
    max-width: 30px !important;
    .volume {
      display: flex;
      flex-direction: column;
      align-items: center;
      .setIcon {
        cursor: pointer;
      }
      .setIcon:hover {
        color: @color;
      }
    }
  }
}

/deep/.el-popover.el-popper {
  max-width: 40px !important;
}
</style>
