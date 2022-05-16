<template>
  <div class="sliderInput">
    <!-- 进度条 -->
    <el-slider
      v-model="currentTime"
      :max="duration"
      size="small"
      height="3px"
      :disabled="duration == 0"
      :show-tooltip="false"
      @change="sliderChange"
    />
  </div>
</template>

<script setup lang="ts">
import { playMusicControl } from "@/store/playMusicControl";
import { storeToRefs } from "pinia";
const { currentTime, duration } = storeToRefs(playMusicControl());
const playStore = playMusicControl();
const sliderChange = (val: number) => {
  playStore.onSliderInput(val);
};
</script>

<style scoped lang="less">
.sliderInput {
  width: calc(100% - 200px);
  box-sizing: border-box;
  height: 10px;
}

/deep/.el-slider__runway {
  height: 3px;
}
/deep/.el-slider__bar {
  height: 3px;
  background-color: @color !important;
}
/deep/.el-slider__button {
  width: 8px;
  height: 8px;
  display: none !important;
  background-color: @color;
  border: solid 1px @color;
}
.el-slider:hover {
  /deep/.el-slider__button {
    display: inline-block !important;
  }
}
</style>
