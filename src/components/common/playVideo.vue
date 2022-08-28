<template>
  <div>
    <video v-if="mvInfo?.url" id="mse" autoplay="true" controls="true">
      <source :src="mvInfo?.url" type="video/mp4" />
    </video>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { getMvUrl } from "@/server/mv";
import type { mvInfoTypes } from "@/server/mv/types.d";

import { playMusicControl } from "@/store/playMusicControl";
import { mainStore } from "@/store";
const musicControl = playMusicControl();
const MainStore = mainStore();
const Route = useRoute();

let videoId: number = Route.query && Number.parseInt(Route.query.videoId + "");
let mvInfo = ref<mvInfoTypes>();

onMounted(() => {
  musicControl.playState = true;
  // 暂停播放歌曲
  musicControl.setPlayState();
  // 隐藏底部控制台
  MainStore.setControlVisible(false);
});
onBeforeUnmount(() => {
  MainStore.setControlVisible(true);
});
getMvUrl(videoId).then((res) => {
  mvInfo.value = res;
});
</script>

<style scoped lang="less">
#mse {
  width: 100%;
  height: calc(100vh - 140px);
}
</style>
