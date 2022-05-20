<template>
  <div class="volume">
    <el-slider
      :model-value="volumeValue"
      :disabled="mute"
      vertical
      height="100px"
      @input="volumeChange"
    />
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
import IconPart from "@/components/icon";
import { VolumeSmall, VolumeMute } from "@icon-park/vue-next";
import { defineProps, defineEmits } from "vue";
defineProps<{
  volumeValue: number;
  mute: boolean;
}>();
const emits = defineEmits<{
  (e: "update-mute"): void;
  (e: "update-volume-value", value: number): void;
}>();
// 设置静音
const muteClick = () => {
  emits("update-mute");
};
// 设置音量
const volumeChange = (num: number) => {
  emits("update-volume-value", num);
};
</script>

<style scoped lang="less">
.volume {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .el-slider {
    width: auto;
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
/deep/.el-slider__runway {
  height: 3px;
}
/deep/.el-slider__bar {
  height: 3px;
  background-color: @color !important;
}
/deep/.el-slider__button {
  width: 10px;
  height: 10px;
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
