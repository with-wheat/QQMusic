<template>
  <div>
    <video v-if="mvInfo?.url" id="mse" autoplay="true" controls="true">
      <source :src="mvInfo?.url" type="video/mp4" />
    </video>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getMvUrl } from "@/server/mv";
import type { mvInfoTypes } from "@/server/mv/types.d";
const Route = useRoute();
let videoId: number = Route.query && Number.parseInt(Route.query.videoId + "");
let mvInfo = ref<mvInfoTypes>();
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
