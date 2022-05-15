<template>
  <div class="volume">
    <el-slider v-model="volumeValue" :disabled="mute" vertical height="100px" />
    <span>{{ volumeValue }}</span>
    <IconPart
      class="icon"
      :icon="mute ? VolumeMute : VolumeSmall"
      size="20"
      :stroke-width="3"
      @click="muteClick"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import IconPart from "@/components/icon";
import { VolumeSmall, VolumeMute } from "@icon-park/vue-next";
import { playMusicControl } from "@/store/playMusicControl";
import { storeToRefs } from "pinia";
const playStore = playMusicControl();

const { mute } = storeToRefs(playMusicControl());
const volumeValue = ref(0);
// 设置静音
const muteClick = () => {
  playStore.setMute();
};
</script>

<style scoped lang="less">
.volume {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .el-slider {
    width: 10px;
  }
  span {
    margin: 3px 0;
  }
  .icon {
    cursor: pointer;
  }
  .icon:hover {
    color: @color;
  }
}
</style>
