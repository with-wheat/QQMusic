<template>
  <div class="playList">
    <div class="timer">
      <span>{{ secondsFormat(currentTime) }}</span>
      <span class="sp">/</span>
      <span>{{ secondsFormat(duration) }}</span>
    </div>
    <div>
      <IconPart :icon="Bill" size="20" />
    </div>
    <div class="musicList">
      <IconPart
        :icon="MenuUnfold"
        size="20"
        @click="
          () => {
            drawer = true;
          }
        "
      />
    </div>
  </div>
  <el-drawer v-model="drawer" :with-header="false">
    <h2>播放列表</h2>
  </el-drawer>
</template>

<script setup lang="ts">
import IconPart from "@/components/icon";
import { Bill, MenuUnfold } from "@icon-park/vue-next";
import { storeToRefs } from "pinia";
import { playMusicControl } from "@/store/playMusicControl";
import { secondsFormat } from "@/utils/timer";
import { ref } from "vue";
const { currentTime, duration } = storeToRefs(playMusicControl());
const drawer = ref(false);
</script>

<style scoped lang="less">
.playList {
  width: 140px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    span {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    span:hover {
      color: @color;
    }
  }
  .timer {
    display: flex;
    justify-content: space-between;
    .sp {
      padding: 0 5px;
      box-sizing: border-box;
    }
  }
}
</style>
