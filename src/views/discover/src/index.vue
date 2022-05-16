<template>
  <div>
    <el-scrollbar>
      <header>
        <Banner />
      </header>
      <div class="count">
        <ExclusivePlaylist />
        <RecommendSong />
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import Banner from "./banner.vue";
import ExclusivePlaylist from "./exclusivePlaylist.vue";
import RecommendSong from "./recomSong.vue";
</script>

<style scoped lang="less">
header {
  box-sizing: border-box;
  padding: 10px 20px;
}
</style>
